export const truncateString = (input: string, maxLength: number): string  => {
  if(!input) return "";
    if (input.length <= maxLength) {
      return input;
    } else {
      return input.substring(0, maxLength) + '...';
    }
  }