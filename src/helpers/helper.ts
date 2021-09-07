export const delayMillis = (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export const greet = (name: string): void => {
  console.log(`Hello ${name}`);
};

export const foo = async (num?: number): Promise<boolean> => {
  greet('World ' + num);
  await delayMillis(1000);
  console.log('done');
  return true;
};
