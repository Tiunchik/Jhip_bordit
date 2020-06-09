export interface IClient {
  id?: number;
  firstName?: string;
  patronim?: string;
  lastName?: string;
  age?: number;
  email?: string;
  photoContentType?: string;
  photo?: any;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstName?: string,
    public patronim?: string,
    public lastName?: string,
    public age?: number,
    public email?: string,
    public photoContentType?: string,
    public photo?: any
  ) {}
}
