import React from 'react'


const GalleryUpload = () => {
    const [file, setFile] = React.useState<File | null>(null)
    const [caption, setCaption ] = React.useState('')
    const encodeImageFileAsURL = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.onerror = () => {
                reject(reader.error)
            }
            reader.readAsDataURL(file)
        })
    }

    const upload = async (e: React.FormEvent) => {
        e.preventDefault()
        const imageString = await encodeImageFileAsURL(file!)
        const res = await fetch('/.netlify/functions/gallery', {
            method: 'POST',
            body: JSON.stringify({
                image: imageString,
                caption
            })
        })

        const data = await res.json()
    }

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (e?.target?.files?.[0]) {
            setFile(e.target.files[0])
        }
    }

    return (
        <form onSubmit={upload}>
            <input type="file" onChange={handleAddImage} />
            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} />
            <button type="submit">Upload</button>
        </form>
    )
}

export default GalleryUpload