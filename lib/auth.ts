import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./configFirebase";
import { collection, doc, getDocs, getFirestore, query, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore'
import { ModelUser } from "@/model/user";

const auth = getAuth(app)
const firestore = getFirestore(app)
export async function loginUser(type: 'email' | 'nama', input: string, password: string) {

    let email = ''
    if (type == 'nama') {
        const hasil = await findUser(type, input)
        if (!hasil) return false
        email = hasil.email
    } else {
        email = input
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(firestore, 'users', user.uid);

        await updateDoc(userRef, {
            lastLoginAt: Timestamp.now(),
        });

        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}
export async function createUser(
    nama: string,
    email: string,
    password: string,
    role: 'inspektor' | 'penanggungjawab' | 'inventaris' | 'pengguna'
): Promise<{
    success: boolean;
    error?: string;
    emailTaken?: boolean;
    namaTaken?: boolean;
}> {
    const [existingEmail, existingNama] = await Promise.all([
        findUser('email', email),
        findUser('nama', nama)
    ])
    // kosong==false
    const emailTaken = !!existingEmail
    const namaTaken = !!existingNama

    if (emailTaken || namaTaken) {
        return {
            success: false,
            error: 'Validasi gagal',
            emailTaken,
            namaTaken
        }
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const id = user.uid
        const now = Timestamp.now()

        const dataUser: ModelUser = {
            id,
            nama,
            email,
            role,
            createdAt: now,
            lastLoginAt: now,
        }

        await setDoc(doc(firestore, 'users', id), dataUser)

        return { success: true }
    } catch (error) {
        console.error('Gagal membuat user:', error)
        return { success: false, error: 'Gagal membuat akun' }
    }
}

export async function findUser(type: 'email' | 'nama', input: string): Promise<{
    nama: string
    email: string
} | null> {
    const q = query(
        collection(firestore, 'users'),
        where(type, '==', input)
    )

    const querySnapshot = await getDocs(q)

    const firstMatch = querySnapshot.docs[0]

    if (firstMatch) {
        const data = firstMatch.data()
        return {
            nama: data.nama ?? '',
            email: data.email ?? ''
        }
    }
    return null;
}
