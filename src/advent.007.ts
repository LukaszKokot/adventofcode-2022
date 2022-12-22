import { open } from 'node:fs/promises';

// Parsing
enum LineType {
  GO_INSIDE = 'cd',
  LIST = 'ls',
  DIRECTORY_INFO = 'dir',
  FILE_INFO = 'file',
}

interface Line {
  name?: string;
  size?: number;
  type: LineType;
}

class DirectoryLine implements Line {
  type = LineType.FILE_INFO;
  constructor(readonly name: string) {}
}

class FileLine implements Line {
  type = LineType.FILE_INFO;
  constructor(readonly name: string, readonly size: number) {}
}

class GoInsideLine implements Line {
  type = LineType.GO_INSIDE;
  constructor(readonly name: string) {}

  public isRoot(): boolean {
    return this.name === '/';
  }

  public isGoingBack(): boolean {
    return this.name === '..';
  }
}

// Structure
class File {
  constructor(readonly name: string, readonly size: number) {}
}

class Folder {
  private files: File[];
  private folders: Folder[];
  private size: number;

  constructor(readonly name: string, readonly parentFolder?: Folder) {
    this.files = [];
    this.folders = [];
    this.size = 0;
  }

  public addFolder(folder: Folder): void {
    this.folders.push(folder);
  }

  public addFile(file: File): void {
    this.files.push(file);
    this.increaseSize(file.size);
  }

  public hasFiles(): boolean {
    return this.files.length > 0;
  }

  public hasFolders(): boolean {
    return this.folders.length > 0;
  }

  public getFolders(): IterableIterator<Folder> {
    return this.folders.values();
  }

  public getFolderByName(name: string): Folder | undefined {
    return this.folders.find(f => f.name === name);
  }

  public getSize(): number {
    return this.size;
  }

  public increaseSize(fileSize: number): void {
    this.size += fileSize;
    this.parentFolder?.increaseSize(fileSize);
  }
}

const parseLine = (line: string): Line => {
  if (line.startsWith('$ ')) {
    if (line.startsWith('$ cd')) {
      const matches = [...line.matchAll(/\$ cd ([a-zA-Z0-9./]+)/g)];
      return new GoInsideLine(matches?.[0][1].toString() || '');
    }

    return {
      type: LineType.LIST,
    };
  }

  if (line.startsWith('dir')) {
    const matches = [...line.matchAll(/dir ([a-zA-Z0-9./]+)/g)];
    return new DirectoryLine(matches?.[0][1]);
  }

  const matches = [...line.matchAll(/([0-9]+) ([a-zA-Z0-9./]+)/g)];
  const size = +matches?.[0][1] || 0;
  const name = matches?.[0][2];
  return new FileLine(name, size);
};

const computeMaxSizeBelow = ({
  folder,
  maxFolderSize,
}: {
  folder: Folder;
  maxFolderSize: number;
}): number => {
  let size = 0;
  if (folder.getSize() <= maxFolderSize) {
    size += folder.getSize();
  }

  if (folder.hasFolders()) {
    const subFolders = folder.getFolders();
    let currentFolder: IteratorResult<Folder>;
    while (!(currentFolder = subFolders.next())?.done) {
      size += computeMaxSizeBelow({
        folder: currentFolder.value,
        maxFolderSize,
      });
    }
  }

  return size;
};

const computeFoldersSmallerThan = ({
  folder,
  maxFolderSize,
}: {
  folder: Folder;
  maxFolderSize: number;
}): Folder[] => {
  let folders: Folder[] = [];
  if (folder.getSize() >= maxFolderSize) {
    folders.push(folder);
  }

  if (folder.hasFolders()) {
    const subFolders = folder.getFolders();
    let currentFolder: IteratorResult<Folder>;
    while (!(currentFolder = subFolders.next())?.done) {
      folders.push(
        ...computeFoldersSmallerThan({
          folder: currentFolder.value,
          maxFolderSize,
        })
      );
    }
  }

  return folders;
};

export const computeSizeOfFolders = async ({
  inputFilePath,
  options = {
    maxFolderSize: 100000,
    spaceToFind: 30000000,
    totalSpace: 70000000,
  },
}: {
  inputFilePath: string;
  options: {
    maxFolderSize: number;
    spaceToFind: number;
    totalSpace: number;
  };
}): Promise<[number, number]> => {
  const file = await open(inputFilePath);
  let line: string;

  const rootFolder = new Folder('/');
  let currentFolder: Folder | undefined;

  for await (line of file.readLines()) {
    const parsedLine = parseLine(line);

    if (parsedLine instanceof GoInsideLine) {
      if (parsedLine.isGoingBack()) {
        currentFolder = currentFolder?.parentFolder;
        continue;
      }

      if (parsedLine.isRoot()) {
        currentFolder = rootFolder;
        continue;
      }

      currentFolder = currentFolder?.getFolderByName(parsedLine.name);
    } else if (parsedLine instanceof DirectoryLine) {
      currentFolder?.addFolder(new Folder(parsedLine.name, currentFolder));
    } else if (parsedLine instanceof FileLine) {
      currentFolder?.addFile(new File(parsedLine.name, parsedLine.size));
    }
  }

  const sumOfMaxSizeBelow = computeMaxSizeBelow({
    folder: rootFolder,
    maxFolderSize: options.maxFolderSize,
  });

  if (rootFolder.getSize() === 0) {
    return Promise.resolve([sumOfMaxSizeBelow, 0]);
  }

  const spaceToFind = Math.abs(
    options.totalSpace - rootFolder.getSize() - options.spaceToFind
  );
  const smallestFoldersToDelete = computeFoldersSmallerThan({
    folder: rootFolder,
    maxFolderSize: spaceToFind,
  }).sort((f1, f2) => f1.getSize() - f2.getSize());
  const smallestFolderSize = smallestFoldersToDelete?.[0].getSize() || 0;

  return Promise.resolve([sumOfMaxSizeBelow, smallestFolderSize]);
};
