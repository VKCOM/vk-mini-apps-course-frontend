export const normalizeError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(JSON.stringify(error));
};
