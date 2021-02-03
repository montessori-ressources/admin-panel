import * as React from "react";

import {
  CategoryList,
  CategoryShow,
  CategoryCreate,
  CategoryEdit,
} from "./content/categories";

import {
  DocumentList,
  DocumentShow,
  DocumentCreate,
  DocumentEdit,
} from "./content/documents";
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";
import CustomLoginPage from "./CustomLoginPage";

import { config } from "./firebase";

const options = {
  logging: false,
  rootRef: "",
};
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        loginPage={CustomLoginPage}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource
          name="documents"
          icon={DescriptionIcon}
          list={DocumentList}
          show={DocumentShow}
          create={DocumentCreate}
          edit={DocumentEdit}
        />
        <Resource
          name="categories"
          icon={CategoryIcon}
          list={CategoryList}
          show={CategoryShow}
          create={CategoryCreate}
          edit={CategoryEdit}
        />
      </Admin>
    );
  }
}

export default App;
