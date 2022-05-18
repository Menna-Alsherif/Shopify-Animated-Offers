import {Card, Image, RadioButton, Stack, Spinner, Frame} from "@shopify/polaris";
import * as realmHelper from "../../../helpers/mongodb-realm";
import {gql, useQuery} from "@apollo/client";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";


const RestLocal = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        const result = await axios('/api/rest/test?shop=animated-offers-dev.myshopify.com');
        setUsers(result.data);
      };
      fetchData();

  }, []); // reminder, if we don't pass an empty array or dependency list, useEffect will render forever (infinite loop)

  return (
    <Card sectioned title="rest call to custom rest api in /pages/api/rest folder">
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.login}
          </li>
        ))}
      </ul>
    </Card>
  )
};

export default RestLocal;
