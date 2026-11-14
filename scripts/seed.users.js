import bcrypt from "bcrypt";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../src/config/db.js";

const seedUsers = [{ username: "admin", password: "1234", role: "admin" }];

const isHashed = (value) => typeof value === "string" && /^\$2[aby]\$/.test(value);

const run = async () => {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);

    if (snapshot.empty) {
        for (const user of seedUsers) {
            const password = await bcrypt.hash(user.password, 10);
            const docRef = await addDoc(usersCollection, { ...user, password });
            console.log(`Usuario "${user.username}" creado (id: ${docRef.id})`);
        }
        process.exit(0);
    }

    for (const userDoc of snapshot.docs) {
        const data = userDoc.data();
        if (isHashed(data.password)) {
            console.log(`Usuario "${data.username}" ya tiene password hasheada, sin cambios`);
            continue;
        }
        const password = await bcrypt.hash(String(data.password), 10);
        await updateDoc(doc(db, "users", userDoc.id), { password });
        console.log(`Password de "${data.username}" migrada a hash (id: ${userDoc.id})`);
    }

    process.exit(0);
};

run();
