import React, { useState, useEffect } from 'react';
import { List, Button, Layout, Modal, Form, Input, Select, message, Skeleton, Checkbox } from 'antd';
import TodoItem from './TodoItem';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import { Todo } from '../types';
import moment from 'moment'; // Importation de moment.js pour le formatage des dates

const { Header, Footer, Content } = Layout;
const { Option } = Select;

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Partial<Todo> | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            message.error('Erreur lors du chargement des tâches.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingTodo(null);
        setModalVisible(true);
    };

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
        setModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(t => t.id !== id));
            message.success('Tâche supprimée avec succès.');
        } catch (error) {
            message.error('Erreur lors de la suppression de la tâche.');
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingTodo) {
                const updatedTodo = await updateTodo({ ...editingTodo, ...values });
                setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
                message.success('Tâche modifiée avec succès.');
            } else {
                const newTodo = await createTodo(values);
                setTodos([...todos, newTodo]);
                message.success('Tâche ajoutée avec succès.');
            }
            setModalVisible(false);
        } catch (error) {
            message.error('Erreur lors de l\'ajout ou de la modification de la tâche.');
        }
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleCheckboxChange = async (todo: Todo, checked: boolean) => {
        try {
            const updatedTodo = await updateTodo({ ...todo, isFait: checked });
            setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
            message.success('État de la tâche mis à jour avec succès.');
        } catch (error) {
            message.error('Erreur lors de la mise à jour de l\'état de la tâche.');
        }
    };

    const handleStatusChange = async (todo: Todo, status: 'IMPORTANT' | 'MOYENNE' | 'FAIBLE') => {
        try {
            const updatedTodo = await updateTodo({ ...todo, statut: status });
            setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
            message.success('Statut de la tâche mis à jour avec succès.');
        } catch (error) {
            message.error('Erreur lors de la mise à jour du statut de la tâche.');
        }
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ color: 'white' }}>
                TODOLIST 😊
            </Header>
            <Content style={{ padding: '5px' }}>
                <Skeleton loading={loading} active>
                    <List
                        dataSource={todos}
                        renderItem={todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onCheckboxChange={handleCheckboxChange}
                                onStatusChange={handleStatusChange}
                            />
                        )}
                    />
                </Skeleton>
            </Content>
            <Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button type="primary" onClick={handleAdd}>Nouvelle tache</Button>
                <div>&copy; by Rayan RAVELONIRINA</div>
            </Footer>
            <Modal
                visible={modalVisible}
                title={editingTodo ? 'Modifier Tâche' : 'Ajouter Tâche'}
                onCancel={handleModalCancel}
                onOk={handleModalOk}
                confirmLoading={loading}
            >
                <Form form={form} initialValues={editingTodo || { isFait: false, statut: 'MOYENNE' }}>
                    <Form.Item name="title" label="Titre" rules={[{ required: true, message: 'Veuillez entrer un titre.' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="descriptions" label="Descriptions" rules={[{ required: true, message: 'Veuillez entrer une description.' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="isFait" label="Fait" valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                    <Form.Item name="statut" label="Statut" rules={[{ required: true, message: 'Veuillez choisir un statut.' }]}>
                        <Select>
                            <Option value="IMPORTANT">IMPORTANT</Option>
                            <Option value="MOYENNE">MOYENNE</Option>
                            <Option value="FAIBLE">FAIBLE</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default TodoList;
