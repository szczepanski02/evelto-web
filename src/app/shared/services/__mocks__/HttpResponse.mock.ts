export const HttpResponseMock = <T>(status: number, body: T) => {
  return { status, body };
};
