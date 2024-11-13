import pkg from '../../package.json'
export function getVersion() {
  const version = localStorage.getItem('version')
  if (!version) {
    localStorage.setItem('version', pkg.version)
    return false
  } else if (version !== pkg.version) {
    return true
  }
  return false
}

export function setVersion() {
  localStorage.setItem('version', pkg.version)
}
