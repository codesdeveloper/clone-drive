import drive from './drive.png';
import file from './file.png';
import { BiHelpCircle } from 'react-icons/bi';
import { HiSearch, HiOutlineDownload } from 'react-icons/hi';
import { RiEqualizerFill } from 'react-icons/ri';
import { GrAddCircle } from 'react-icons/gr';
import { auth, db, storage } from './Firebase';
import { useState, useEffect } from 'react';


function Home(props) {

    let [files, setFiles] = useState([]);
    useEffect(() => {
        db.collection(props.user.uid).get().then((querySnapshot) => {
            setFiles(querySnapshot.docs.map(doc => { return doc.data() }));
        });
    },);

    function signout() {
        auth.signOut();
    }

    function upload(e) {
        let file = e.target.files[0];
        let ref = storage.ref(props.user.uid);
        let uploadTask = ref.child(file.name).put(file);
        let progress_container = document.querySelector('aside .progress');
        let progress = document.querySelector('aside .progress progress');

        progress_container.style.display = 'block';
        uploadTask.on('state_changed',
            (snapshot) => {
                progress.value = (snapshot.bytesTransferred / snapshot.totalBytes);

            },
            (error) => {
                alert('Erro ao fazer upload')
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    progress_container.style.display = 'none';
                    db.collection(props.user.uid).add({
                        name: file.name,
                        url: downloadURL,
                        type: file.type
                    })
                    alert('Upload realizado com sucesso');
                });
            }
        );
    }

    return (
        <div className="Home">
            <header>
                <div className='logo'>
                    <img src={drive} />
                    <span>Drive</span>
                </div>

                <form>
                    <button type="submit"><HiSearch /></button>
                    <input placeholder='Pesquise no Drive' type="text" name="search" />
                    <span className='filter_search'><RiEqualizerFill /></span>
                </form>

                <div className='settings'>
                    <div className='icon_help'>
                        <BiHelpCircle />
                    </div>
                    <div className='user_icon'>
                        <img src={props.user.photoURL} />
                        <a onClick={signout} href=''>Sair</a>
                    </div>
                </div>
                <div className='clear'></div>
            </header>

            <main>
                <aside>

                    <form>
                        <label>
                            <GrAddCircle />
                            Novo
                            <input onChange={upload} type="file" name="file" />
                        </label>
                        <div className='progress'>
                            <progress max="1" value="0"></progress>
                            <span>Uploading File......</span>
                        </div>
                    </form>

                </aside>
                <section>

                    <h1>Meu Drie</h1>

                    <div className='files'>

                        {
                            files.map(e => {
                                return (
                                    <div className='file'>
                                        <a target="_blank" href={e.url}>

                                            {
                                                (e.type.startsWith('image/')) ? <div style={{ backgroundImage: `url("${e.url}")` }} className='img'></div>
                                                    : <div style={{ backgroundImage: `url("${file}")` }} className='img'></div>
                                            }

                                            <div className='title'>
                                                <HiOutlineDownload />
                                                {e.name}
                                            </div>

                                          
                                        </a>
                                    </div>
                                )
                            })

                        }

                    </div>

                </section>
            </main>
        </div>
    )
}

export default Home;