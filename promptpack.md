# PromptPack Output

**Root:** `/Users/swapnil/Documents/Projects/lifestyle/pages`
**Generated:** 2026-06-05T06:27:25.933Z

---

## 1) Folder Structure

```txt
.
├─ _app.js
├─ _document.js
├─ _error.js
├─ 404.js
├─ admin/
│  ├─ dashboard.js
│  ├─ finance.js
│  ├─ products.js
│  └─ profile.js
├─ api/
│  ├─ carts.js
│  ├─ categories.js
│  ├─ groups.js
│  ├─ hello.js
│  ├─ inventory.js
│  ├─ login.js
│  ├─ logout.js
│  ├─ orders.js
│  ├─ products.js
│  ├─ receiveFriendReq.js
│  ├─ reviews.js
│  ├─ sendFriendReq.js
│  ├─ session.js
│  ├─ users.js
│  └─ wishlists.js
├─ auth/
│  ├─ login.js
│  └─ register.js
├─ index.js
├─ landing.js
├─ profile.js
└─ test.js
```

<!-- PAGE BREAK: FILE CONTENTS BELOW -->

## 2) File Contents


### _app.js

```javascript
import 'styles/globals.css'
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PreLoader/index.js";

import "@fortawesome/fontawesome-free/css/all.min.css";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

=========================================================
* Dashboard NextJS - v1.1.0 based on Tailwind Starter Kit by Hashinclude
=========================================================

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>HAS</title>
          {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
 
  
        </Head>
        
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}

```

### _document.js

```javascript
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>

        <link rel="manifest" href="/manifest.json" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/icon512_rounded.png" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/icon512_maskable.png"
          />
      


          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          />

        </Head>
        <body className="text-blueGray-700 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

```

### _error.js

```javascript
import React, { Component } from "react";
import Router from "next/router";

export default class _error extends Component {
  componentDidMount = () => {
    Router.push("/");
  };

  render() {
    return <div />;
  }
}

```

### 404.js

```javascript
import React, { Component } from "react";
import Router from "next/router";

export default class Error404 extends Component {
  componentDidMount = () => {
    Router.push("/");
  };
 
  render() {
    return <div />;
  }
}

```

### admin/dashboard.js

```javascript

import Admin from "layouts/Admin.js";
export default function body(props){}
body.layout = Admin;

```

### admin/finance.js

```javascript

import Admin from "layouts/Admin.js";
export default function body(props){}
body.layout = Admin;

```

### admin/products.js

```javascript

import Admin from "layouts/Admin.js";
export default function body(props){}
body.layout = Admin;

```

### admin/profile.js

```javascript

import Admin from "layouts/Admin.js";
export default function body(props){}
body.layout = Admin;

```

### api/carts.js

```javascript
import dbConnect from '../../utils/dbConnect';
import Cart from '../../models/Cart';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;
    const cart = await Cart.findOne({ user: userId }).populate('items.groceryItemId');
    res.status(200).json(cart);
  } else if (req.method === 'POST') {
    const { userId, items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items },
      { new: true, upsert: true }
    );
    res.status(201).json(cart);
  } else if (req.method === 'DELETE') {
    const { userId } = req.body;
    await Cart.findOneAndDelete({ user: userId });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

```

### api/categories.js

```javascript
import {Category} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { message } from 'antd';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Category, {
  useAuth: false, 
  middleware: addToGroupAndSaveMiddleware('Category', 'Group', 'groupId', 'categories'), 
});

// export default createHandler(Product, {
//   populate: 'category', // Populate category field if it’s a reference in Product model
//   fileField: 'image',   // Assuming Product has an 'image' field for file uploads
// }

```

### api/groups.js

```javascript
import Group from 'models/Group';
import { createHandler } from '../../controllers/genericHandler';


export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {
  const { body } = req;
  const { method } = req;
  if(['POST', 'PUT'].includes(method)){
    Array.isArray(body.members) ? null : body.members = [body.members] 
    body.members.push(body.userId);
    delete body.userId
  }
};

export default createHandler(Group, {
  useAuth: false, 
  middleware: customMiddleware, 
  populate: 'members'
});

```

### api/hello.js

```javascript
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

```

### api/inventory.js

```javascript
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';
import Inventory from 'models/Inventory';


export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {

      const { body } = req;
      const { method } = req;
      let newInventoryIds = [];
      

      if (method === 'POST') {
        let groupId = body.groupId
        try {

         
          for (const item of body.inventoryData) {

            const existingInventory = await Inventory.findOne({
              product: item.product,
              splitAmong: item.splitAmong,
            })

            if (existingInventory) {
              existingInventory.unit = item.unit;
              existingInventory.price = item.price;
              existingInventory.quantityAvailable = parseInt(existingInventory.quantityAvailable) + parseInt(item.quantityAvailable);
              existingInventory.lastUpdated = new Date();
              await existingInventory.save()
            }
            else{
              let newDoc = new Inventory(item);
              let savedDoc = await newDoc.save()
              await Group.updateOne(
                { _id: groupId },  
                { $addToSet: { inventories: savedDoc._id } } 
              )
            }
          }

        
          res.status(200).json({
            message: `inventory created successfully`,
          });

          return 'ok'
        } catch (error) {
          console.error(`Error in inventory api:`, error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
};


export default createHandler(Inventory, {
  useAuth: false, 
  middleware:customMiddleware,
  populate: ['product','splitAmong']
}); 

```

### api/login.js

```javascript
// pages/api/auth/login.js

import User from 'models/User';
import { createHandler } from '../../controllers/genericHandler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import parseFormData from 'utils/parseFormData';
import { serialize } from 'cookie';

export const config = {
  api: {
    bodyParser: false,
  },
};

const loginMiddleware = async (req, res) => {
  const  fields  = req.body
  const { email, password } = fields;

  if (!email || !password) {
     res.status(400).json({ success: false, message: 'Username and password are required' });
     return 'ok'
  }

  // Find user
  const user = await User.findOne({ email }).populate('groups');
  if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return 'ok'
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
     res.status(401).json({ success: false, message: 'Invalid credentials' });
     return 'ok'
  }
  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email, groupId: user.groups.find(group => group.name === "ISOLATED_GROUP")?._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

    res.setHeader('Set-Cookie', serialize('auth', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    }));
     res.status(200).json({ message: 'Login successful' });
     return 'ok'
};

export default createHandler(User, {
  useAuth: false,
  middleware: loginMiddleware,
});

```

### api/logout.js

```javascript
// pages/api/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
    res.setHeader('Set-Cookie', serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0),
    }));
    res.status(200).json({ message: 'Logged out' });
}

```

### api/orders.js

```javascript
import Order from 'models/Order';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';


export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Order, {
  useAuth: false, 
  middleware:addToGroupAndSaveMiddleware('Order', 'Group', 'groupId', 'orders'),
  populate: ['items.product','paidBy','createdBy','items.splitAmong']
});

```

### api/products.js

```javascript
import {Product} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Product,{
  useAuth: false, 
  middleware:addToGroupAndSaveMiddleware('Product', 'Group', 'groupId', 'products'),
  populate: ['category']
});

```

### api/receiveFriendReq.js

```javascript
import User from 'models/User';
import { createHandler } from '../../controllers/genericHandler';
import parseFormData from 'utils/parseFormData';
import Group from 'models/Group';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function receiveFriendRequest(userId, friendId, action) {
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return { message: 'User or friend not found' };
    }

    let message;

    let isInGroup;
    switch (action) {
      case "DELETE":
        isInGroup = await Group.exists({ members: friendId });
    
        if (isInGroup) {
            // If the user is a member of any group, prevent removal from friends
            message = 'Cannot delete friend: user is a member of one or more groups.';
            break;
        }
        user.friends = user.friends.filter(
          (f) => f.requester.toString() !== friendId
        );
    
        // Remove user from friend's friends array
        friend.friends = friend.friends.filter(
          (f) => f.requester.toString() !== userId
        );
        
        await user.save();
        await friend.save();

        message= 'Friend removed!'
        break;
      
      case "ACCEPTED":
        user.friends = user.friends.map((f) =>
          f.requester.toString() === friendId.toString()
            ? { ...f, status: 'ACCEPTED' }
            : f
        );
    
          // Check if `userId` exists in `friend.friends`
        const userInFriendList = friend.friends.find((f) => f.requester.toString() === userId.toString());
        
        if (userInFriendList) {
          // If `userId` is in `friend.friends`, update the status to 'ACCEPTED'
          friend.friends = friend.friends.map((f) =>
            f.requester.toString() === userId.toString()
              ? { ...f, status: 'ACCEPTED' }
              : f
          );
        } else {
          // If `userId` is not in `friend.friends`, add it with status 'ACCEPTED'
          friend.friends.push({ requester: userId, status: 'ACCEPTED' });
        }
    
        await user.save();
        await friend.save();
    
        message= 'Friend accepted!'
        break;
      
      case "REJECTED":
        isInGroup = await Group.exists({ members: friendId });
    
        if (isInGroup) {
            // If the user is a member of any group, prevent removal from friends
            message = 'Cannot reject friend: user is a member of one or more groups.';
            break;
        }
        user.friends = user.friends.map((f) =>
            f.requester.toString() === friendId.toString()
              ? { ...f, status: 'REJECTED' }
              : f
        );
      
        friend.friends = friend.friends.filter(
          (f) => f.requester.toString() !== userId
        );
         
      
        await user.save();
        await friend.save();
      
        message= 'Friend rejected!'
        break;
    
      default:
        return { message: 'No Such Action' }
    }

    return { message: message };



  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
}

const customMiddleware = async (req, res) => {
  const fields  = req.body
  
  const response = await receiveFriendRequest(fields.userId, fields.friendId,fields.action);
  if (response.message === 'Friend removed!' || 
      response.message === 'Friend accepted!' || 
      response.message === 'Friend rejected!') {
     res.status(200).json(response); 
     return "ok"
  } else {
     res.status(400).json({ success: false, message: response.message });
    return "ok"
  }

};

export default createHandler(User, {
  useAuth: false, 
  middleware: customMiddleware, 
});

```

### api/reviews.js

```javascript
import dbConnect from '../../utils/dbConnect';
import Review from '../../models/Review';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { groceryItemId } = req.query;
    const reviews = await Review.find({ groceryItem: groceryItemId }).populate('user');
    res.status(200).json(reviews);
  } else if (req.method === 'POST') {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await Review.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

```

### api/sendFriendReq.js

```javascript
import User from 'models/User';
import { createHandler } from '../../controllers/genericHandler';
import parseFormData from 'utils/parseFormData';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function sendFriendRequest(userId, friendEmail) {
  try {
    // Find the friend by their email
    const friend = await User.findOne({ email: friendEmail.toLowerCase() });
    if (!friend) {
      return { message: "Friend not found with the provided email!" };
    }
    
    
    // Find the current user
    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found" };
    }

    if(friendEmail == user.email){
      return { message: "Can not send friend request to yourself!" };
    }

    const existingFriend = friend.friends.some(
      (f) => f.requester.toString() === user._id.toString() && f.status === 'ACCEPTED'
    );

    if(existingFriend){
      return { message: "Already Friend!" };
    }

    const existingFriendRejection = friend.friends.some(
      (f) => f.requester.toString() === user._id.toString() && f.status === 'ACCEPTED'
    );

    if(existingFriendRejection){
      return { message: "Friend request rejected!" };
    }

    // Check if there's already a pending request from the user to the friend
    const existingRequestToFriend = friend.friends.some(
      (f) => f.requester.toString() === user._id.toString() && f.status === 'PENDING'
    );

    if (existingRequestToFriend) {
      return { message: "Friend request already exists!" };
    }

    // Check if there's already a pending request from the friend to the user
    const existingRequestFromFriend = user.friends.some(
      (f) => f.requester.toString() === friend._id.toString() && f.status === 'PENDING'
    );

    if (existingRequestFromFriend) {
      // Accept the existing request
      user.friends = user.friends.map((f) =>
        f.requester.toString() === friend._id.toString()
          ? { ...f, status: 'ACCEPTED' }
          : f
      );

      friend.friends.push({
        requester: user._id,
        status: 'ACCEPTED',
        timestamp: new Date()
      });

      await user.save();
      await friend.save();

      return { message: "Friend request accepted!" };
    }

    // Create a new friend request in the friend's friends array
    friend.friends.push({
      requester: user._id,
      status: 'PENDING',
      timestamp: new Date()
    });

    await friend.save();
    return { message: "send" };
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
}

const customMiddleware = async (req, res) => {
  const  fields  = req.body
  const response = await sendFriendRequest(fields._id, fields.friendEmail);
  if(response.message == 'send'){
    res.status(200).json(response);
    return 'ok'
  }else{
    res.status(400).json({ success: false, message: response.message });
    return 'ok'
  }

};

export default createHandler(User, {
  useAuth: false, 
  middleware: customMiddleware, 
});

```

### api/session.js

```javascript
// pages/api/session.js
import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';

export default function handler(req, res) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const user = verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

```

### api/users.js

```javascript
import User from 'models/User';

import { createHandler } from '../../controllers/genericHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {
  console.log("Running custom middleware...");
  
};

export default createHandler(User, {
  useAuth: false, 
  middleware: customMiddleware, 
  populate: ['groups','friends.requester','groups.members']
});

```

### api/wishlists.js

```javascript
import Wishlist from 'models/Wishlist';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';


export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Wishlist, {
  useAuth: false, 
  middleware:addToGroupAndSaveMiddleware('Wishlist', 'Group', 'groupId', 'wishlists'),
  populate: ['items.product','paidBy','createdBy','items.splitAmong']
});

```

### auth/login.js

```javascript
import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/router';
// layout for page

import Auth from "layouts/Auth.js";
import FetchAPI from "controllers/fetchAPI";
import PageChange from "components/PreLoader";

export default function Login() {
  const router = useRouter();
  const [preLoader, setPreLoader] = React.useState(0);
  const [tempData, setTempData] = React.useState({});

  const handleChange = (e) => {
      const { name, value } = e.target;
      setTempData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        
      const file = e.target.files?e.target.files[0]:null;

      if (file) {
          setTempData((prevState) => ({
            ...prevState,
            file: file,
          }));
      }
  }

  const handleSave = async () => {
    setPreLoader(true);

    try {
      const result = await FetchAPI('/api/login', 'POST', tempData);
      if (result.message === 'Login successful') {
        // Redirect to dashboard
        router.push('/admin/dashboard'); // Change to your dashboard route
    } else {
        // Handle login failure (show an error message, etc.)
        alert(result.message || 'Login failed');
    }
      setPreLoader(false); // Stop the preloader

    } catch (error) {
      console.log('_____login Account Failed!_____');
      setPreLoader(false);
      console.log(error);
    }
  };

  if(preLoader) return <PageChange />

  return (
    <>
      
      <div className="container mx-auto px-4 h-full md:mt-20 mt-14">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-2/5 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6  bg-[#161616] border-0">
              <div className="rounded-t px-6 py-6">
                <div className="flex items-center w-full justify-center ">
                  <div className=" flex justify-center items-center  rounded-full  ">
                    <img src="/assets/images/logo.png" className="px-2  w-52     rounded-full " alt="" />
                  </div>
                </div>
              </div>
              <div className="flex-auto pt-0">
                {/* <div className="text-white text-center py-4 text-lg font-medium">
                  Welcome to LifeStyle 
                </div> */}
                <form onSubmit={(e)=>{e.preventDefault();handleSave()}}>
                  
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Email */}
                    </label>
                    <input
    
                      className="border-0 px-3 py-4 placeholder-blueGray-400 drop-shadow-sm  font-medium text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email address"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Password */}
                    </label>
                    <input
        
                      className="border-0 px-3 py-4 placeholder-blueGray-400 font-medium drop-shadow-sm text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      type="password"
                      id="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-flex text-white items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className=" flex items-center justify-center ">
                    <button type="submit" class=" my-6 md:my-8  w-fit text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200  border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px]  ">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mt-9 relative ">
              <div className="">
                <a
                  href="#pablo"
                  onClick={()=>alert("For security reasons we did not automate this process, to reset password please contact swapnilhgf@gmail.com")}
                  
                >
                  <p className="text-white hover:text-blueGray-600 text-base font-medium drop-shadow-sm">Forgot password?</p>
                </a>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;

```

### auth/register.js

```javascript
import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/router';
// layout for page

import Auth from "layouts/Auth.js";
import FetchAPI from "controllers/fetchAPI";
import PageChange from "components/PreLoader";

export default function Register() {
  const router = useRouter();
  const [preLoader, setPreLoader] = React.useState(0);
  const [tempData, setTempData] = React.useState({});

  const handleChange = (e) => {
      const { name, value } = e.target;
      setTempData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        
      const file = e.target.files?e.target.files[0]:null;

      if (file) {
          setTempData((prevState) => ({
            ...prevState,
            file: file,
          }));
      }
  }

  const handleSave = async () => {
    setPreLoader(true);

    try {
      const result = await FetchAPI('/api/users', 'POST', tempData);
      setPreLoader(false); // Stop the preloader
      router.push("/auth/login")
    } catch (error) {
      console.log('_____Create Account Failed!_____');
      setPreLoader(false);
      console.log(error);
    }
  };

  if(preLoader) return <PageChange />

  return (
    <>
      
      <div className="container mx-auto px-4 h-full md:mt-20 mt-14">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-2/5 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6  bg-[#161616] border-0">
              <div className="rounded-t px-6 py-6">
                <div className="flex items-center w-full justify-center ">
                  <div className=" flex justify-center items-center  rounded-full  ">
                    <img src="/assets/images/logo.png" className="px-2  w-52     rounded-full " alt="" />
                  </div>
                </div>
              </div>
              <div className="flex-auto pt-0">
                {/* <div className="text-white text-center py-4 text-lg font-medium">
                  Welcome to LifeStyle 
                </div> */}
                <form onSubmit={(e)=>{e.preventDefault();handleSave()}}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Email */}
                    </label>
                    <input
    
                      className="border-0 px-3 py-4 placeholder-blueGray-400 drop-shadow-sm  font-medium text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Your Name"
                      name="name"
                      type="text"
                      id="name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Email */}
                    </label>
                    <input
    
                      className="border-0 px-3 py-4 placeholder-blueGray-400 drop-shadow-sm  font-medium text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email address"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Password */}
                    </label>
                    <input
        
                      className="border-0 px-3 py-4 placeholder-blueGray-400 font-medium drop-shadow-sm text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      type="password"
                      id="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* <div>
                    <label className="inline-flex text-white items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className=" flex items-center justify-center ">
                    <button type="submit" class=" my-6 md:my-8  w-fit text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200  border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px]  ">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mt-9 relative ">
              <div className="">
                <a
                  href="#pablo"
                  onClick={()=>alert("For security reasons we did not automate this process, to reset password please contact swapnilhgf@gmail.com")}
                  
                >
                  {/* <p className="text-white hover:text-blueGray-600 text-base font-medium drop-shadow-sm">Forgot password?</p> */}
                </a>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;

```

### index.js

```javascript
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import useInstallPrompt from '../utils/useInstallPrompt';
import { useRouter } from "next/router";
import UAParser from 'ua-parser-js';


// default redirection 
// export async function getServerSideProps(context) {
//   return {
//     redirect: {
//       destination: '/auth/login',
//       permanent: false,
//     },
//   }
// }



export default function Index() {
	const { installApp, isIos, isInStandaloneMode } = useInstallPrompt();
	const [windowWidth, setWindowWidth] = useState(null);
	const [dialog, setDialog] = useState(false);

	const router = useRouter()
	useEffect(() => {
		
        setWindowWidth(window.outerWidth);
    }, []);



	const installAppOnDevice = () =>{	
		if(isIos){
			return setDialog(true)
		}else{
			try{
				installApp()
			}finally{
				alert("App successfully installed on your decide please check")
			}
			return router.push('/auth/login')
		}
	}
	
	useEffect(()=>{isInStandaloneMode?router.push('/auth/login'):""},[isInStandaloneMode])
	
	const [browserName, setBrowserName] = useState('');

	useEffect(() => {
		const userAgent = navigator.userAgent;

		const getBrowserName = (userAgent) => {
		if (/CriOS/.test(userAgent)) {
			return "Chrome"; // Chrome on iOS
		} else if (/FxiOS/.test(userAgent)) {
			return "Firefox"; // Firefox on iOS
		} else if (/Safari/.test(userAgent) && !/CriOS/.test(userAgent)) {
			return "Safari"; // Safari on iOS
		} else if (/EdgiOS/.test(userAgent)) {
			return "Edge"; // Edge on iOS
		} else {
			return "Unknown"; // Other browsers
		}
		};

		const browserName = getBrowserName(userAgent);
		setBrowserName(browserName);
	}, []);

  return (
    <>
      {/* <IndexNavbar fixed /> */}
	  {dialog?
	  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
	  <div className="bg-white rounded-lg p-6 w-80 md:w-96 shadow-lg relative">
	  	<button onClick={()=>{setDialog(false)}} className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 focus:outline-none" >
			✕
		</button>
		<h2 className="text-xl font-bold mb-4 text-center">Install App</h2>
	
		<div className="text-sm text-gray-600">
			
			Tap the Share icon below <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 inline-block bg-black text-white rounded-sm p-[1px]">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
			</svg>,

			 then select '<span className="font-bold text-black">Add to Home Screen'</span> to install the app.
		</div>
		<div className=" flex items-center justify-between mt-3">
			<div className="flex flex-col">
				{browserName=="Safari"?
				<span className="relative">
					
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 absolute text-black bottom-[4.7%] left-[45.5%] animate-ping  ">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
					</svg>
					
					<img src="/assets/images/install_safari.png" className="w-32" />
				</span>
				
				:
				<span className="relative">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2 absolute text-black top-[6.7%] left-[88.3%] animate-ping   ">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
					</svg>

					<img src="/assets/images/install_chrome.png" className="w-32" />
				</span>
				}
				<span className="text-xs text-white font-semibold bg-black w-fit px-2 py-[3px]  rounded-lg mt-1">Step-1</span>
			</div>
			<div className="flex flex-col">
					<span className="relative"> 
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-[6px] absolute text-black top-[67.6%] border-[0.2px] rounded-[1px] border-black  left-[86.9%] animate-ping ">
							<path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
						</svg>

						<img src="/assets/images/install_share.png" className="w-32" />
					</span>
					<span className="text-xs text-white font-semibold bg-black w-fit px-2 py-[3px] rounded-lg mt-1">Step-2</span>
			</div>
		</div>
	</div>
	</div>
	  :<></>}
	  	
	  	<div className="bg-[#161616] flex flex-col overflow-hidden min-h-screen max-h-screen relative ">
			<header>
				<nav class="  ">
					<div class="flex flex-wrap justify-between  my-6 md:my-12 items-center w-full ">

						<p class="font-bold text-[8px] md:text-xs capitalize w-52 md:w-96 md:px-7  mx-4 md:mx-8 leading-[1.3] text-[#dcdbdb]  ">Introducing Lifestyle. Track expenses, create grocery lists, and plan budgets—all in one place! Take control of your finances effortlessly!</p> 
						<div  class="z-index-top scale-10 md:scale-100 mx-4 md:mx-16 flex gap-2">
							<div onClick={()=>{installAppOnDevice()}}  class={` ${isInStandaloneMode?"hidden":""} text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200 border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px] `}>Install
							</div> 
							<div onClick={()=>{router.push('/auth/login')}} class=" md:block hidden text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200  border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px]  ">Get Started
							</div>
						</div>
					</div>
				</nav>
			</header>
		<style>{`

		.logo {
			z-index: 100;
			width: 65%;
			height: auto;
		}

		.div-block-4 {
			justify-content: center;
			align-items: center;
			display: flex;
			position: absolute;
			bottom: auto;
			left: 0%;
			right: 0%;
		}


.sachets {
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
}

.sachet-1 {
  z-index: 99;
  position: absolute;
  bottom: auto;
  left: auto;
  right: auto;
}

.sachet-1.float-1 {
  width: 100%;
  position: static;
}

.sachet-1.mobile-only {
  display: none;
}

.sachet-4 {
  width: 12%;
  position: absolute;
  top: 59.6vh;
  bottom: auto;
  left: 13.4vw;
  right: auto;
}

.sachet-4.float {
  width: 100%;
  position: static;
}

.sachet-2 {
  width: 17%;
  position: absolute;
  
  left: auto;
  right: 11.2vw;
}

.sachet-2.float {
  width: 100%;
  position: static;
}

.sachet-5 {
  width: 7%;
  position: absolute;
  top: 40.15vh;
  left: auto;
  right: 38.4vw;
}

.sachet-5.float {
  width: 100%;
  position: static;
}

		`}</style>
			<div   class="sachets ">
				<div  class="div-block-4 absolute  top-[16%] md:top-[30.5%] ">
						<img src="assets/images/lifestyle2.png"   alt="" class="logo" />
				</div>
				<div  class="absolute animate-float  top-[1.5vh] hidden md:block" >
					<img class="sachet-5 float" src="assets/images/4.png" alt=""  sizes="(max-width: 767px) 100vw, 7vw"  />
				</div>
				<div  class="sachet-2 bottom-28 md:-bottom-4 animate-floatSlow  " >
					<img class="sachet-2 float " src="assets/images/3.png" alt=""  sizes="(max-width: 767px) 100vw, 17vw"   />
				</div>
				<div  class="sachet-4 animate-floatFast" >
					<img src="assets/images/2.png"    alt="" class="sachet-4 float" />
				</div>
				<div  class="sachet-1 top-[25.7vh] w-[88%] -mt-10 block md:hidden animate-float" >
					<img class="sachet-1 float-1 " src="assets/images/1.png" alt=""  sizes="(max-width: 767px) 100vw, 800px"    />
				</div>
				<div class="sachet-1 top-[25.7vh] md:top-[53.7vh]">
					<div class=" font-semibold mt-0 text-[#cacaca] text-base md:text-base flex flex-col items-center gap-4">
						<div class="py-4 block md:hidden"><img src="assets/images/logo.png" class="h-16  shadow-2xl shadow-red-50 rounded-full bg-white bg-opacity-20 " /></div>
						<a href="/shop" class="hover:text-white hover:cursor-pointer hover:underline">Documentation</a>
						{/* <div class="hover:text-white hover:cursor-pointer hover:underline">About Me</div> */}
						<div class="hover:text-white hover:cursor-pointer hover:underline">swapniljadhav.com</div>
						{/* <div class="hover:text-white hover:cursor-pointer hover:underline">CONTACT US</div> */}
						<a href="https://www.instagram.com/lastlords/" class="flex gap-6 md:gap-2 hover:text-white hover:cursor-pointer hover:underline">
							
							<svg
							xmlns="http://www.w3.org/2000/svg"
							class=" md:h-6 md:w-6 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
						</svg></a>
					</div>
				</div>
			</div>

			<div class=" text-[8px] md:text-sm capitalize absolute bottom-0 gap-2 md:gap-4 ml-4 font-semibold md:ml-6 my-6 text-[#cacaca] flex flex-row">
				<div class="hover:text-white hover:cursor-pointer hover:underline">privacy policy</div>
				<div class="hover:text-white hover:cursor-pointer hover:underline">terms & conditions</div>
				<div class="hover:text-white hover:cursor-pointer hover:underline">returns & refunds</div>
				<div class="hover:text-white hover:cursor-pointer hover:underline">© 2024 Noname pvt ltd</div>
			</div>

		</div>

      {/* <Footer /> */}
    </>

  );
}

```

### landing.js

```javascript
import React from "react";
import Link from "next/link";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Your story starts with us.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    This is a simple example of a Landing Page you can build
                    using Notus NextJS. It features multiple CSS components
                    based on the Tailwind CSS design system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Awarded Agency</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Divide details about your product or agency work into
                      parts. A paragraph describing a feature will be enough.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Free Revisions</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Keep you user engaged by providing meaningful information.
                      Remember that by this time, the user is curious.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Verified Company</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Write a few lines about each one. A paragraph describing a
                      feature will be enough. Keep you user engaged!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Working with us is a pleasure
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Don't let your uses guess by attaching tooltips and popoves to
                  any element. Just make sure you enable them first via
                  JavaScript.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you're
                  good to go. Just make sure you enable them first via
                  JavaScript.
                </p>
                <Link legacyBehavior href="/">
                  <a href="#pablo" className="font-bold text-blueGray-700 mt-8">
                    Check Notus NextJS!
                  </a>
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-blueGray-700 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-200">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">A growing company</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    The extension comes with three pre-built pages to help you
                    get started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Here are our heroes</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-1-800x800.jpg"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ryan Tompson</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-2-800x800.jpg"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Romina Hadid</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-3-800x800.jpg"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Alexa Smith</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      UI/UX Designer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="/img/team-4-470x470.png"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

```

### profile.js

```javascript
import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Profile() {
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Jenna Stones
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    Los Angeles, California
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

```

### test.js

```javascript
import React from "react";
import dynamic from 'next/dynamic'

const OpenStreetMapTest = dynamic(() => import('../components/Map/OpenStreetMapTest'), {
    ssr: false,
  })

const Test = () =>{
    
    return(<div >
         <OpenStreetMapTest />
    </div>)
}

export default Test

```