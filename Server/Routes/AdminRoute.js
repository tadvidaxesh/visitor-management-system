import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.get('/assests/:aid', (req, res) => {
    const aid = req.params.aid;
    const sql = "SELECT * FROM assest WHERE aid = ?";
    con.query(sql, [aid], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});


router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.post('/add_visitors', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'image', maxCount: 1 }]), (req, res) => {
    const sql = `INSERT INTO visitors 
    (firstName, lastName, dob, gender, email, contactNo, address, resume, image) 
    VALUES (?)`;

    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.dob,
        req.body.gender,
        req.body.email,
        req.body.contactNo,
        req.body.address,
        req.files['resume'] ? req.files['resume'][0].filename : null, // Check if resume file is uploaded
        req.files['image'] ? req.files['image'][0].filename : null // Check if image file is uploaded
    ];
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true });
    });
});
router.get('/visitors', (req, res) => {
    const sql = "SELECT * FROM visitors";
    con.query(sql, (err, result) => {
        if(err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(result);
    });
});

router.post('/add_assest', (req, res) => {
    const sql = `INSERT INTO assest 
    (category, ownerf, ownerl, description, serialno, modelno) 
    VALUES (?)`;
    
           const values = [
            req.body.category,
            req.body.ownerf,
            req.body.ownerl, 
            req.body.description,
            req.body.serialno,
            req.body.modelno
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })

   

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.get('/assests', (req, res) => {
    const sql = "SELECT * FROM assest";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.put('/edit_assest/:aid', (req, res) => {
    const aid = req.params.aid;
    const sql = `UPDATE assest 
        SET category = ?, ownerf = ?, ownerl = ?, description = ?, serialno = ?, modelno = ?
        WHERE aid = ?`;
    const values = [
        req.body.category,
        req.body.ownerf,
        req.body.ownerl,
        req.body.description,
        req.body.serialno,
        req.body.modelno,
        aid
    ];
    con.query(sql, values, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error: " + err});
        return res.json({Status: true, Result: result});
    });
});

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.delete('/delete_assest/:aid', (req, res) => {
    const aid = req.params.aid;
    const sql = "delete from assest where aid = ?"
    con.query(sql,[aid], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
