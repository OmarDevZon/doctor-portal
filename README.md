# doctor-portal

## hash Password

```bash
yarn add bcrypt
```

```bash
yarn add --save-dev @types/bcrypt
```

```bash
import bcrypt from 'bcrypt';
```

utils/hashPassword.ts

```bash

import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, Number(12));

  return hashPassword;
};



```

```bash
  const password = await hashPassword(data.password);
```

or

```bash



const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

```
