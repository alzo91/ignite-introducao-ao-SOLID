import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    // Complete aqui
    const { name, email } = request.body;
    if (this.createUserUseCase.validationEmail(email)) {
      return response.status(400).json({ error: "This e-mail already exist" });
    }
    const newUser = this.createUserUseCase.execute({ name, email });
    return response.status(201).json(newUser);
  }
}

export { CreateUserController };
