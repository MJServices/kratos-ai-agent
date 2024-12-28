import expressValidator from "express-validator";
import { createUser } from "../services/user.service.js";
import { ApiError, ApiResponse } from "../utilities/APIResponse.js";

export const createUserController = async (req, res) => {
  try {
    const errors = await expressValidator.validationResult(req);
    if (errors.isEmpty()) {
        const user = await createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          if(!user){
            throw new ApiError(400, "error in user creation");
          }
      const token = await user.generateJWT(user);
      if(!token){
        throw new ApiError(400, "token generation error");
      }
      
      return res.status(201).json(
        new ApiResponse(
                    201,
                    {
                        user: user,
                        token: token,
                    },
                    "User created successfully"
                )
      )
    } else {
        throw new ApiError(400, "error in user creation");
    }
  } catch (error) {
    throw new ApiError(500, "Internal Server Error", [error]);
  }
};
