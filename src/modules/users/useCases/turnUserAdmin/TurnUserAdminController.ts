import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    // Complete aqui
    const { user_id } = request.params;

    if (!this.turnUserAdminUseCase.validationId(user_id)) {
      return response.status(400).json({ error: "bad request" });
    }

    if (!this.turnUserAdminUseCase.existUserById(user_id)) {
      return response.status(404).json({ error: "User isn't exist" });
    }

    const user = this.turnUserAdminUseCase.execute({ user_id });

    return response.json(user);
  }
}

export { TurnUserAdminController };
