export namespace IForm {
  export namespace ILogin {
    export interface IValues {
      email: string;
      password: string;
    }

    export interface IErrors extends IValues {}
  }

  export namespace IRegister {
    export interface IValues {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      avatar: string;
    }

    export interface IErrors extends IValues {}
  }
}
