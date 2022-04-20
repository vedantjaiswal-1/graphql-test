import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation register($name: String $email: String $password: String){
        register(name: $name email: $email password: $password)
    }
`