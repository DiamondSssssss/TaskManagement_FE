import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Typography, Row, Col, Button, Input, Table, message, Modal, Form, Select, DatePicker } from 'antd';
import axios from 'axios';
import { TASKS_URL } from '../../utils/api';
import TaskDetail from '../TaskDetail/TaskDetail';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

function Main() {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext); // Get user context, which includes the accountId
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields on cancel
  };
  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(TASKS_URL);
      const formattedTasks = response.data.map(task => ({
        key: task.TaskId,
        task: task.TaskName,
        type: task.TaskType === 1 ? 'Uu Tien' : 'Khong Uu Tien',
        deadline: moment(task.Deadline).format('YYYY-MM-DD'),
        status: task.Status === 1 ? 'Active' : 'Completed',
        description: task.Description,
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Failed to fetch tasks');
    }
  };

  const handleAddTask = async (values) => {
    try {
      // Prepare data for the API call
      const taskData = {
        taskName: values.taskName,
        description: values.taskDescription,
        taskType: values.taskType,
        deadline: values.taskDeadline,
        status: 1, // Default status
        accountId: user.accountId // Use the accountId of the logged-in user
      };

      const response = await axios.post(TASKS_URL, taskData);

      // Assuming the response contains the created task's ID and title
      setTasks(prevTasks => [
        ...prevTasks,
        {
          key: response.data.taskId, // Using the unique taskId returned by the API
          task: response.data.taskName,
          type: response.data.taskType === 1 ? 'Uu Tien' : 'Khong Uu Tien',
          deadline: moment(response.data.deadline).format('YYYY-MM-DD'),
          status: response.data.status === 1 ? 'Active' : 'Completed',
          description: response.data.description,
        },
      ]);
      message.success('Task added successfully');
      handleCancel(); // Close modal after adding task
    } catch (error) {
      console.error('Error adding task:', error);
      message.error('Failed to add task');
    }
  };

  const handleDeleteTask = (key) => {
    const newTasks = tasks.filter((task) => task.key !== key);
    setTasks(newTasks);
  };

  const handleViewDetail = async (taskId) => {
    try {
      const response = await axios.get(`${TASKS_URL}/${taskId}`);
      setSelectedTask(response.data);
      setIsDetailModalVisible(true);
    } catch (error) {
      console.error('Error fetching task details:', error);
      message.error('Failed to fetch task details');
    }
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedTask(null);
  };
  const columns = [
    {
      title: 'Task',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            key={`delete-${record.key}`}
            danger
            onClick={() => handleDeleteTask(record.key)}
            style={{ marginRight: '8px' }}
          >
            Delete
          </Button>
          <Button
            key={`view-${record.key}`}
            type='primary'
            onClick={() => handleViewDetail(record.key)}
          >
            View Detail
          </Button>
        </span>
      ),
    },
  ];

  return (
    console.log(tasks),
    <>
      {user && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Title level={4}>Welcome, {user.username}!</Title>
        </div>
      )}
      <Row
        align="middle"
        justify="center"
        style={{
          minHeight: '100vh',
          maxWidth: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title className="main-title" level={2}>
            TaskMaster
          </Title>
        </Col>
        <Col span={24} style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={20}>
              <Row gutter={16} justify="start">
                <Col span={24}>
                  <Button type="primary" size="large" onClick={showModal} block>
                    Add Task
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ flex: '1 1 auto' }}>
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={20} md={16} lg={20}>
              <Table
                columns={columns}
                dataSource={tasks}
                width="100%"
                rowKey="key"
                pagination={{ pageSize: 5 }}
                scroll={{ y: 350 }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modal for Adding Task */}
      <Modal
        title="Add New Task"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTask}>
          <Form.Item
            name="taskName"
            label="Task Name"
            rules={[{ required: true, message: 'Please input the task name!' }]}
          >
            <Input placeholder="Enter task name" />
          </Form.Item>
          <Form.Item
            name="taskDescription"
            label="Task Description"
          >
            <Input.TextArea placeholder="Enter task description" />
          </Form.Item>
          <Form.Item
            name="taskType"
            label="Task Type"
            rules={[{ required: true, message: 'Please select the task type!' }]}
          >
            <Select placeholder="Select task type">
              <Option value="1">Uu Tien</Option>
              <Option value="0">Khong Uu Tien</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="taskDeadline"
            label="Deadline"
            rules={[{ required: true, message: 'Please select the deadline!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Task Details"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={null}
        width={600}
      >
        {selectedTask && <TaskDetail task={selectedTask} />}
      </Modal>
    </>
  );
}

export default Main;
