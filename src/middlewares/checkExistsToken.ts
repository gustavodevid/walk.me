import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes';
dotenv.config(); 
const secret = process.env.SECRET;   
export const checkExistsToken = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    const auth = req.headers.authorization;
    let token;
    if(!auth){
        res.status(StatusCodes.UNAUTHORIZED).json('Não foi possível autenticar usuário.')
    }
    else{
        token = auth.split(' ')[1] || ' '
    }
    if(!token || !secret){
        res.status(StatusCodes.UNAUTHORIZED).json('Não foi possível autenticar usuário.')
    }
    else{
      try{
        jwt.verify(token, secret)
        next();
        }  
        catch(err){
            res.status(StatusCodes.UNAUTHORIZED).json('Não foi possível autenticar usuário.')
        }
    }
    
}