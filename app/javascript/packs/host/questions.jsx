import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Table, Form, Input, InputNumber } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const QuestionsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const QuestionModal = ({
  createQuestion,
  initialQuestion,
  handleCancel,
  visible,
}) => {
  const [form] = Form.useForm();
  
  function handleSubmit() {
    form.validateFields()
      .then(values => createQuestion(values))
      .catch(() => console.log('Something went wrong'));
  }

  return (
    <Modal
      title='New question'
      visible={visible}
      okText='Create'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        initialValues={initialQuestion}
      >
        <Form.Item name={'title'} label="Title" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={'points'} label="Points" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={'time'} label="Time (sec)" rules={[{ required: true, type: 'number', min: 5, max: 300 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={'answer'} label="Answer" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const Questions = ({ questions, sendQuestion, addQuestion }) => {
  const [customQuestion, setCustomQuestion] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  function handleCreateQuestion(question) {
    addQuestion(question)
    setModalVisible(false);
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'Time (s)',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            shape="round"
            icon={<SendOutlined />}
            onClick={() => sendQuestion(record)}
          >
            Send
          </Button>
        </div>
      ),
    }
  ];

  return (
    <div>
      <QuestionsTitle>
        <h3>Questions</h3>
        <div>
          <Button
            onClick={() => setModalVisible(true)}
          >
            Add question
          </Button>
        </div>
      </QuestionsTitle>
      <Table
        dataSource={questions}
        columns={columns}
        rowKey={record => record.id}
      />
      <div>
        <input
          type="text"
          onChange={e => setCustomQuestion(e.target.value)}
        />
        <button
          onClick={() => sendQuestion({ id: 'open', title: customQuestion, time: 60 })}
        >
          Send question
        </button>
      </div>
      <QuestionModal
        visible={modalVisible}
        handleCancel={() => setModalVisible(false)}
        createQuestion={handleCreateQuestion}
      />
    </div>
  );
};

export default Questions;