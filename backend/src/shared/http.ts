import type {Request,RequestHandler} from 'express';import jwt from 'jsonwebtoken';
export interface SessionRequest extends Request {userId:string}
export const authRequired:RequestHandler=(req,res,next)=>{try{const token=req.cookies.moment_session as string|undefined;if(!token)return res.status(401).json({message:'ابتدا وارد حساب شوید'});const data=jwt.verify(token,process.env.JWT_SECRET??'dev-secret') as {sub:string};(req as unknown as SessionRequest).userId=data.sub;next();}catch{return res.status(401).json({message:'نشست شما منقضی شده است'});}};
export const sessionCookie={httpOnly:true,sameSite:'lax' as const,secure:process.env.NODE_ENV==='production',maxAge:30*24*60*60*1000};
