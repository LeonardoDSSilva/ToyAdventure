import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Register.css'
import Menu from '../../Components/Menu/Menu.js'
import InputForms from '../../Components/Input Forms/InputForms.js'
import Button from '../../Components/Button/Button.js'
import SuccessRegister from '../Alerta Sucesso/Cadastro/SuccessRegister.js'
import RadioButton from '../../Components/RadioButton/RadioButton.js'
import axios from 'axios'

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        grupo: '',
        email: '',
        senha: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminChecked, setAdminChecked] = useState(false);
    const [estoquistaChecked, setEstoquistaChecked] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdminChange = () => {
        setAdminChecked(true);
        setEstoquistaChecked(false);
        setFormData(prevState => ({
            ...prevState,
            grupo: 'administrador'
        }));
    };

    const handleEstoquistaChange = () => {
        setAdminChecked(false);
        setEstoquistaChecked(true);
        setFormData(prevState => ({
            ...prevState,
            grupo: 'estoquista'
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsModalOpen(true);
        console.log("formData::: ", formData);
        try {
            const dados = {
                nome: formData.nome,
                cpf: formData.cpf,
                grupo: formData.grupo === 'administrador' ? 'admin' : 'estoquista',
                email: formData.email,
                senha: formData.senha
            };

            console.log(dados);
            console.log(dados.grupo);

            const response = await axios.post('http://localhost:3033/usuario', dados);

            console.log('Resposta da requisição:', response.data);

            if (response.status === 200) {
                console.log('Usuário cadastrado com sucesso:', response.data);
            } else {
                console.error('Erro ao cadastrar usuário:', response.data);
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };

    return (
        <div className='container__page'>
            <Menu />
            <div className='container__register'>
                <form onSubmit={handleSubmit}>
                    <div className='titulo'>
                        <h1>Cadastrar usuário no sistema</h1>
                    </div>

                    <div className='container__dados'>
                        <h2>Dados cadastrais</h2>
                        <h3>Dados pessoais</h3>
                        <div className='container__input'>
                            <InputForms
                                placeholderInput='Nome Completo'
                                type='text'
                                name='nome'
                                value={formData.nome}
                                onChange={(value) => handleInputChange('nome', value)}
                            />
                            <InputForms
                                placeholderInput='CPF'
                                type='text'
                                name='cpf'
                                value={formData.cpf}
                                onChange={(value) => handleInputChange('cpf', value)}
                            />
                        </div>
                    </div>
                    <div className='container__grupo'>
                        <h2>Permissões do sistema / Grupo</h2>
                        <div className='container__radio__button container__input'>
                            <RadioButton
                                name='admin'
                                value='administrador'
                                nameValue='Administrador'
                                checked={adminChecked}
                                onChange={handleAdminChange}
                            />
                            <RadioButton
                                name='estoquista'
                                value='estoquista'
                                nameValue='Estoquista'
                                checked={estoquistaChecked}
                                onChange={handleEstoquistaChange}
                            />
                        </div>
                    </div>
                    <div className='container__dados'>
                        <h3>E-mail</h3>
                        <div className='container__input'>
                            <InputForms
                                placeholderInput='E-mail'
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={(value) => handleInputChange('email', value)}
                            />
                            <InputForms
                                placeholderInput='Confirme sua e-mail'
                                type='email'
                                name='confirmarEmail'
                                value={formData.confirmarEmail}
                                onChange={(value) => handleInputChange('confirmarEmail', value)}
                            />
                        </div>
                    </div>
                    <div className='container__dados'>
                        <h3>Senha</h3>
                        <div className='container__input'>
                            <InputForms
                                placeholderInput='Senha'
                                type='password'
                                name='senha'
                                value={formData.senha}
                                onChange={(value) => handleInputChange('senha', value)}
                            />
                            <InputForms
                                placeholderInput='Confirme sua senha'
                                type='password'
                                name='confirmarSenha'
                                value={formData.confirmarSenha}
                                onChange={(value) => handleInputChange('confirmarSenha', value)}
                            />
                        </div>
                    </div>
                    <div className='container__button'>
                        <Button
                            styleType='dangerYes'
                            children='Salvar'
                            type='submit'
                        />
                        <Button
                            styleType='dangerNo'
                            children='Cancelar'
                            onClick={() => navigate('/lista-de-usuario')}
                        />
                    </div>
                </form>
            </div>
            {isModalOpen && <SuccessRegister name={formData.nome} />}
        </div>
    )
}