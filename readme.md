# Project Script Injector for ab testing

This project includes a React component that dynamically injects a script into the webpage. The script performs the following actions:

1. **Checks for an existing `variation` parameter in the URL**.
2. **Verifies if the project exists** by making an API call.
3. **Ensures the script is only executed if the domain matches**.
4. **Updates the URL with a `variation` parameter if it doesn't already exist**.

## Features

- **URL Parameter Check**: Ensures the script only runs if the `variation` parameter is not already present.
- **API Validation**: Makes an API call to check if the project exists.
- **Domain Validation**: Verifies that the script is running on the correct domain.
- **Dynamic URL Update**: Modifies the URL to include a `variation` parameter based on the current time.

## Installation and running

### Frontend

```bash
cd my-app
yarn 
yarn dev
```

### Backend

#### Add superbase key in

```bash
backend/utils/superbaseClient

```

```bash
npm install
npm start
```

### Database
 
```bash
-- Create a 'projects' table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create a 'scripts' table to store project scripts
CREATE TABLE scripts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  script_text text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);



```





