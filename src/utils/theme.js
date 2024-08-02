// 获取主题色
export function getThemeColorClass (theme) {
  switch (theme) {
    case '#094194':
      return 'blue-theme'
    case '#a91415':
      return 'red-theme'
    case '#8a46ff':
      return 'purple-theme'
    case '#73c088':
      return 'green-theme'
    default:
      return 'blue-theme'
  }
}
