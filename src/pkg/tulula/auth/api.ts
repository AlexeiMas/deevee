/*
 * Rest API is used for authorization flow only.
 * All the other logic should be implemented with graphql api.
 */

const defaultHost = 'https://tulu.la';
const defaultPrefix = '/api/ab';

// Response statuses by rest api.
export enum Status {
  // Something went wrong, check error or errors fields of Response.
  Failure = 'failure',
  Success = 'success',
}

// AuthErrors is a error type, returned by Rest API.
export interface IErrors {
  [s: string]: string[];
}

// Generic response by rest API
export interface IResponse {
  status: Status;
  // error is for one off errors that don't really belong to
  // a particular field. It should be a string.
  // XXX(slava): we append this error to an errors[""] automatically.
  error?: string;
  // errors is for validation errors
  //
  // It is: map[string][]string, where the key in the map is the field
  // and the []string on the other side is the list of problems
  // with that field.
  //
  // It's also important to note that if the errors that were Map()'d
  // did not implement FieldError or for generic errors
  // the empty string ("") is used as a key in the map for those
  // errors that couldn't be fit to a specific field.
  errors?: IErrors;
}

interface ISignUpForm {
  email: string;
  password: string;
  name: string;
  // password will be used if confirm_password isn't set
  confirm_password?: string;

  subscribe: string;

  ls?: string;
  lu?: string;
  teamID?: string;
}

interface ISignInForm {
  email: string;
  password: string;
  rememberMe: boolean;

  ls?: string;
  lu?: string;
}

interface IPasswordResetForm {
  email: string;
  app: 'chat';
  team: string;
}

interface IPasswordResetCheckForm {
  token: string;
}

interface IPasswordResetSubmitForm {
  token: string;
  password: string;
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

// isResponse is a typeguard for Response interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isResponse(arg: any): arg is IResponse {
  return arg.status !== undefined;
}

export class RestAPI {
  private readonly prefix: string;
  private readonly host: string;
  private readonly headers: Record<string, string>;

  constructor(host: string = defaultHost, prefix: string = defaultPrefix, headers?: Record<string, string>) {
    this.host = host;
    this.prefix = prefix;
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  // signUp user with email, name and password.
  // Registration is successful if Response.status == Status.Success.
  // In all other cases please check Response.errors.
  // User will be automatically signed in in case of success.
  public signUp(form: ISignUpForm): Promise<IResponse> {
    return this.post<IResponse>('register', {
      confirm_password: form.password,
      ...form,
    });
  }

  // signIn user by email and password.
  // Authentication is successful if Response.status == Status.Success.
  // In all other cases please check Response.errors.
  public signIn(form: ISignInForm): Promise<IResponse> {
    return this.post<IResponse>('login', {
      email: form.email,
      password: form.password,
      ls: form.ls,
      lu: form.lu,
    });
  }

  // logout user
  public logout(): Promise<IResponse> {
    return this.post<IResponse>('logout');
  }

  // passwordReset send password reset email.
  // Request is successful if Response.status == Status.Success.
  // In all other cases please check Response.errors.
  public passwordReset(form: IPasswordResetForm): Promise<IResponse> {
    return this.post<IResponse>('password-reset', form);
  }

  // passwordResetCheck check password reset token.
  // Request is successful if Response.status == Status.Success.
  // In all other cases please check Response.errors.
  public passwordResetCheck(form: IPasswordResetCheckForm): Promise<IResponse> {
    return this.post<IResponse>('password-reset-check', form);
  }

  // passwordResetSubmit resets the password.
  // Request is successful if Response.status == Status.Success.
  // In all other cases please check Response.errors.
  public passwordResetSubmit(form: IPasswordResetSubmitForm): Promise<IResponse> {
    return this.post<IResponse>('password-reset-submit', form);
  }

  private api<T>(method: string, init?: RequestInit): Promise<T> {
    return api<T>(`${this.host}${this.prefix}/${method}`, {
      credentials: 'include',
      headers: this.headers,
      ...init,
    }).then(result => {
      if (isResponse(result)) {
        // Append error to errors[""] to simplify errors handling.
        if (result.error !== undefined) {
          if (result.errors === undefined) {
            result.errors = {};
          }
          if (result.errors[''] === undefined) {
            result.errors[''] = [];
          }
          result.errors[''].push(result.error);
        }
      }
      return result;
    });
  }

  private post<T>(method: string, form?: unknown): Promise<T> {
    return this.api<T>(method, {
      method: 'post',
      body: form ? JSON.stringify(form) : undefined,
    });
  }
}
