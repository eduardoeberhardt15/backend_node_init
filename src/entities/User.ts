import {uuid} from "uuidv4";
import { IUserClass, IUser } from "src/interfaces/IUser";

class User implements IUserClass{

  public readonly id:string;

  public name:string;
  public email:string;
  public password:string;

  constructor(props: Omit<User, "id">, id?:string){
      this.name=props.name;
      this.email=props.email;
      this.password=props.password;

      this.id=!id ? uuid(): id;
  }

  async save(user:IUser):Promise<boolean>{

    return true;
  }

  async findByEmail(email:string):Promise<IUser>{

    return this;
  }
}