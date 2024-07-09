import React, { useState } from 'react';
import { List, Button, Switch, Select } from 'antd';
import { Todo } from '../types';
import moment from 'moment';

const { Option } = Select;

interface TodoItemProps {
    todo: Todo;
    onEdit: (todo: Todo) => void;
    onDelete: (id: number) => void;
    onCheckboxChange: (todo: Todo, checked: boolean) => void;
    onStatusChange: (todo: Todo, status: 'IMPORTANT' | 'MOYENNE' | 'FAIBLE') => void;
}

const getColor = (_isFait: boolean, statut: 'IMPORTANT' | 'MOYENNE' | 'FAIBLE') => {
    if (_isFait) {
        return 'transparent'
    }
    switch (statut) {
        case 'IMPORTANT':
            return '#FF7F7F39';
        case 'MOYENNE':
            return '#8ECCFF8F';
        case 'FAIBLE':
            return '#FFF8DB';
        default:
            return 'white';
    }
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onCheckboxChange, onStatusChange }) => {
    const [loading, setLoading] = useState(false);

    const handleStatusChange = (value: 'IMPORTANT' | 'MOYENNE' | 'FAIBLE') => {
        onStatusChange(todo, value);
    };

    const handleSwitchChange = async (checked: boolean) => {
        setLoading(true);
        await onCheckboxChange(todo, checked);
        setLoading(false);
    };

    return (
        <List.Item
            actions={[
                <Button onClick={() => onEdit(todo)}>Modifier</Button>,
                <Button danger onClick={() => onDelete(todo.id)}>Supprimer</Button>,
            ]}
            style={{
                borderRadius: 5,
                backgroundColor: getColor(todo.isFait, todo.statut),
                marginBottom: 10
            }}
        >
            <div style={{ marginLeft: 10, display: 'flex', gap: 10 }}>
                <Switch loading={loading} checked={todo.isFait} onChange={handleSwitchChange} />
                <div>
                    <div>
                        <span>{moment(todo.created_at).format('DD/MM/YYYY HH:mm')}</span>
                        <span style={{ marginLeft: 10, fontWeight: 700 }}>{todo.title}</span>
                    </div>
                    <div>{todo.descriptions}</div>
                </div>
            </div>
            {/* <Select value={todo.statut} onChange={handleStatusChange} style={{ marginLeft: '10px' }}>
                <Option value="IMPORTANT">IMPORTANT</Option>
                <Option value="MOYENNE">MOYENNE</Option>
                <Option value="FAIBLE">FAIBLE</Option>
            </Select> */}
        </List.Item>
    );
};

export default TodoItem;
