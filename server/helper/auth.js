import bcrpyt, { hash } from 'bcrypt';

export const hashPassword = (password) => 
{

    return new Promise((resolve,reject) => 
    {
        bcrpyt.genSalt(12,(err,salt) => 
        {
            if(err) 
            {
                reject(err);
            }
            bcrpyt.hash(password,salt,(err,hash) =>
            {   
                if(err) 
                {
                    reject(err);
                }
                resolve(hash);


            })
        })

    });

};


export const comparePassword = (password, hashed) => 
{
    return bcrpyt.compare(password,hashed);

};