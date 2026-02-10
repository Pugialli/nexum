export function getRingColor(role: string) {
  switch (role) {
    case 'ALUNO':
      return 'ring-blue-500'
    case 'PROFESSOR':
      return 'ring-green-500'
    case 'EXALUNO':
      return 'ring-gray-500'
    default:
      return 'ring-white'
  }
}