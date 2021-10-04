export function extname(path: string) {
    if (path && path.length) {
      const index = path.lastIndexOf('.');
  
      if (index !== -1) {
        path = path.slice(index).toLowerCase();
      }
  
      return path;
    }
  
    return '';
}

export function convertBitRange(fromBits: number, toBits: number) {
  return ((1 << toBits) - 1) / ((1 << fromBits) - 1);
}



const encoder = new TextEncoder();

export function encodeUtf8(utf8: string) {
    return encoder.encode(utf8);
  }

export function bytesOf(buffer: ArrayBuffer | Uint8Array | string | number[]) {
    if (buffer instanceof Uint8Array) {
      return buffer;
    } else if (typeof buffer === 'string') {
      return encodeUtf8(buffer);
    } else {
      return new Uint8Array(buffer);
    }
}

export function base256ToString(number: number) {
    const array = [];
  
    while (number > 0) {
      array.push(String.fromCharCode(number % 256));
      number = Math.floor(number / 256);
    }
  
    return array.reverse().join('');
}