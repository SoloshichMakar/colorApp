export interface ITask {
  taskColor: string;
  taskText: string;
  id: string;
  completed: boolean;
}

export interface IState {
  tasks: Array<ITask>;
  inputText: string; //TODO: inputText
  chosenColor: string;
}

export interface IAction {
  type: string;
  value?: string;
  newTask?: ITask;
  inputText?: string; //TODO: inputText
  deleteId?: string;
  completed?: boolean;
  completedTaskId?: string;
  taskData?:Array<ITask>
  userId?: number
}


export interface ILogin {
  email: string,
  password: string,
  isAuthenticated: boolean,
  userId: number,
  message: string
}

export interface IStateRegistration {
  email: string,
  password: string,
  confirmPassword: string,
  message: string
}

export interface IActionLogin {
  type: string;
  email?: string,
  password?: string,
  checkedUser?:number,
  errorMessage?: string
}

export interface IActionRegistration {
  type: string;
  email?: string,
  password?: string,
  confirmPassword?: string,
  serverResponse?: boolean,
  errorMessage?: string,
}



