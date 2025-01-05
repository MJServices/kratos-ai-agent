import expressValidator from "express-validator";
import { createUser } from "../services/user.service.js";
import { ApiError, ApiResponse } from "../services/APIResponse.service.js";
import User from "../models/user.model.js";

export const createUserController = async (req, res) => {
  try {
    const errors = await expressValidator.validationResult(req);
    if (errors.isEmpty()) {
      const user = await createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      if (!user) {
        throw new ApiError(400, "error in user creation");
      }
      const token = await user.generateJWT(user);
      if (!token) {
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
      );
    } else {
      throw new ApiError(400, "error in user creation");
    }
  } catch (error) {
    throw new ApiError(500, "Internal Server Error", [error]);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const errors = await expressValidator.validationResult(req);
    if (errors.isEmpty()) {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json(new ApiResponse(404, { user }, "user not found"));
      }
      const validatedPass = await user.comparePassword(password);
      if (!validatedPass) {
        return res
          .status(404)
          .json(new ApiResponse(404, { user }, "Invalid password"));
      }
      const token = await user.generateJWT(user);
      if (!token) {
        return res
          .status(404)
          .json(
            new ApiResponse(404, { token }, "Error in user login try again")
          );
      }
      return res.status(201).json(
        new ApiResponse(
          201,
          {
            user: user,
            token: token,
          },
          "User logged in successfully"
        )
      );
    } else {
      throw new ApiError(400, "error in user login");
    }
  } catch (error) {
    throw new ApiError(500, "Internal Server Error", [error]);
  }
};

export const profileUserController = async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: req.user,
      },
      "User profile retrieved successfully"
    )
  );
};
