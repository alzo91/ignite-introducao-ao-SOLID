import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    // Complete aqui
    const { user_id } = request.params;

    if (!this.showUserProfileUseCase.validationId(user_id)) {
      return response.status(400).json({ error: "bad request" });
    }

    if (!this.showUserProfileUseCase.userValidationById(user_id)) {
      return response.status(404).json({ error: "User isn't exist" });
    }
    const user = this.showUserProfileUseCase.execute({ user_id });

    return response.json(user);
  }
}

export { ShowUserProfileController };
