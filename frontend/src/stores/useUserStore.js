
import { create } from 'zustand';

export const useUserStore = create((set) => ({
    user:null,
    loading: false,
    checkingAuth: true,
    
    signup: async(data)=>{
        set({loading:true});
        const dataTwo = Object.fromEntries(data.entries()); 
        dataTwo.assigned = [...data.getAll("assigned")]; 
        console.log('Data From User Store=> ',dataTwo)
        try{
            const response = await fetch('http://localhost:4600/new-user',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataTwo),
                credentials: "include",
            })
            if(!response.ok){
                console.log(response)
                throw new Error('Failed to submit form, ',response)
            }
            const responseData = await response.json();
            console.log('Success:',responseData)
            set({user: responseData, loading:false})
        }catch(error){
            console.error('Error:',error)
        }
    },

    checkAuth: async() => {
        set({checkingAuth: true});
        try{
            const response = await fetch('http://localhost:4600/userprofile')
            set({user: response.data, checkingAuth: false})
        }catch(error){
            console.error('Error:',error)
            set({checkingAuth: false, user:null})
        }
    }
}))