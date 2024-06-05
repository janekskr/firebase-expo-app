export function formatNum(num: number, numC: string) {
  if (num == 1) {
    return (numC + "ę")
  }
  if (num % 100 >= 10 && num % 100 <= 19) {
    return (numC)
  }
  if (num % 10 <= 1 || num % 10 > 4) {
    return (numC)
  }
  if (num % 10 > 1 && num % 10 < 5) {
    return (numC + "y")
  }
}

export function obfuscateEmail(email: string) {
  const [localPart, domainPart] = email.split('@');

  const obfuscatedLocalPart = `${localPart[0]}******${localPart[localPart.length - 1]}`;

  return `${obfuscatedLocalPart}@${domainPart}`;
}