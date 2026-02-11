'use server'

import { connectToDatabase } from "@/database/mongoose"
import { UserForNewsEmail } from "@/types"

export const getAllUsersForNewsEmail = async (): Promise<UserForNewsEmail[]> => {
    try{
         const mongoose =await connectToDatabase();
         const db = mongoose.connection.db;
         if(!db) throw new Error('Database connection not found')

      const users = await db.collection('users').find(
        {email :{$exists:true,$ne :null}, name: {$exists:true,$ne :null}},
        {projection:{id: 1, email:1, name:1,country:1}}
      ).toArray();

      return users.map((user)=>({
        id: user.id?.toString() || user._id?.toString() || '',
        email: user.email!,
        name: user.name!,
      }))

    }catch(error){
        console.error('Error fetching users for news email:',error)
        return []
    }
}