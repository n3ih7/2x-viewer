const enumerateDirectory = async (directory: FileSystemDirectoryHandle | undefined) => {
  const handles: Array<FileSystemHandle> = []
  if (!directory) return handles
  for await (let [name, handle] of directory) {
    if (!name.startsWith(".")) { handles.push(handle) }
  }
  return handles
}
export default enumerateDirectory