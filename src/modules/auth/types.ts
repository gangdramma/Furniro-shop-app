export namespace IEntity {
  export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar: string;
  }
  export interface IData {
    user: IUser;
  }
}

export namespace IForm {
  export interface Register {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar: string;
  }

  export interface Login {
    email: string;
    password: string;
  }
}

export namespace IAuth {
  export namespace Login {
    export interface Request extends IForm.Login {}
  }

  export namespace Register {
    export interface Request extends IForm.Register {}
    export type Response = string;
  }
}

export namespace Types {
  export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
  }

  export interface IContext {
    user: IUser | null;
    methods: {
      logout(): void;
      login: (data: IForm.Login) => void;
      register: (data: IForm.Register) => void;
    };
    isLoading: boolean;
  }
}
