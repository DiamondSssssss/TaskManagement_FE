import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Typography, Row, Col, Button, Input, Table, message, Modal, Form, Select, DatePicker, Switch, Descriptions } from 'antd';
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
  const { user, logout} = useContext(AuthContext); // Get user context, which includes the accountId
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTasks();
    setSelectedTask(null); // Reset selected task on component mount
  }, []);

  useEffect(() => {
    if (selectedTask) {
      form.setFieldsValue({
        taskName: selectedTask.taskName,
        description: selectedTask.description,
        taskType: selectedTask.taskType === 1 ? 1 : 0,
        deadline: moment(selectedTask.deadline),
      });
    }
  }, [selectedTask, form]);
  
  const handleLogout = () => {
    logout(); // Call the logout function
    message.success('Logged out successfully'); // Optionally show a success message
    navigate('/login');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields on cancel
  };

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`${TASKS_URL}/account/${user.accountId}`); // Updated endpoint
      const formattedTasks = response.data.map(task => ({
        key: task.taskId,
        task: task.taskName,
        type: task.taskType,
        deadline: moment(task.deadline).format('YYYY-MM-DD'),
        status: task.status,
        description: task.description,
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Failed to fetch tasks');
    }
  };
  

  const handleAddTask = async (values) => {
    try {
      const taskData = {
        taskName: values.taskName,
        description: values.taskDescription,
        taskType: values.taskType,
        deadline: moment(values.taskDeadline).toISOString(), // Ensure correct date format
        status: 1, // Default status
        accountId: user.accountId // Use the accountId of the logged-in user
      };

      const response = await axios.post(TASKS_URL, taskData);
      setTasks(prevTasks => [
        ...prevTasks,
        {
          key: response.data.taskId,
          task: response.data.taskName,
          type: response.data.taskType,
          deadline: moment(response.data.deadline).format('YYYY-MM-DD'),
          status: response.data.status,
          description: response.data.description,
        },
      ]);
      message.success('Task added successfully');
      handleCancel();
    } catch (error) {
      console.error('Error adding task:', error);
      message.error('Failed to add task');
    }
  };

  const handleDeleteTask = (key) => {
    // Show a confirmation modal
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`${TASKS_URL}/${key}`); // Ensure to call the delete API
          setTasks(tasks.filter((task) => task.key !== key));
          message.success('Task deleted successfully');
        } catch (error) {
          console.error('Error deleting task:', error);
          message.error('Failed to delete task');
        }
      },
    });
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
  const handleViewEdit = async (taskId) => {
    try {
      // Fetch the task details from the server
      const response = await axios.get(`${TASKS_URL}/${taskId}`);
      // Set the selected task to be edited
      setSelectedTask(response.data);
      // Open the edit modal
      setIsEditModalVisible(true);
    } catch (error) {
      console.error('Error fetching task details for edit:', error);
      message.error('Failed to fetch task details for editing');
    }
  };


  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedTask(null);
  };
  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setSelectedTask(null); // Clear selected task on modal close
  };

  const handleEditClick = (record) => {
    setSelectedTask(record);
    setIsEditModalVisible(true);
  };

  const handleUpdateTask = async (values) => {
    try {
        const updatedTaskDto = {
            taskId: selectedTask.key,
            accountId: selectedTask.accountId, // Ensure you are passing the accountId
            taskName: values.taskName,
            description: values.description,
            taskType: values.taskType,
            deadline: moment(values.taskDeadline).toISOString(),
            status: selectedTask.status
        };

        console.log(updatedTaskDto);

        const response = await axios.put(`${TASKS_URL}/${selectedTask.taskId}`, updatedTaskDto);
        if (response.data) {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.key === selectedTask.key ? { ...task, ...updatedTaskDto } : task
                )
            );
            message.success('Task updated successfully');
            setIsEditModalVisible(false);
        }
        await fetchAllTasks(); // Refetch tasks to get updated data
    } catch (error) {
        console.error('Error updating task:', error);
        message.error('Failed to update task');
    }
};


  const handleStatusChange = async (checked, taskId) => {
    try {
        const newStatus = checked ? 1 : 0; // Use 1 for Active and 0 for Inactive

        // Log the request for debugging
        console.log(`Task ID: ${taskId}, Payload: ${newStatus}`);

        const response = await axios.put(`${TASKS_URL}/${taskId}/status`, newStatus, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data); // Log the API response

        // Update the tasks state with the response data
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.key === taskId ? { ...task, status: response.data.status } : task
            )
        );

        message.success(`Task status updated to ${newStatus}`);
    } catch (error) {
        console.error('Error updating task status:', error.response ? error.response.data : error.message);
        message.error('Failed to update task status');
    }
};


  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch
          checked={status === 1}
          onChange={(checked) => handleStatusChange(checked, record.key)}
          checkedChildren="Active"
          unCheckedChildren="Completed"
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type='primary' onClick={() => handleViewDetail(record.key)}>
            View Detail
          </Button>
          <Button
            type='default'
            onClick={() => handleViewEdit(record.key)}
            style={{ marginLeft: '20px' }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDeleteTask(record.key)}
            style={{ marginLeft: '20px' }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      {user && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Title level={4}>Welcome, {user.username}!</Title>
          <Button danger primary onClick={handleLogout} style={{ marginLeft: '20px' }}>
      Logout
    </Button>
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
          <Row justify="center" style={{ width: '150%' }}>
            <Col xs={24} sm={20} md={16} lg={20}>
              <Table
                columns={columns}
                dataSource={tasks}
                width="100%"
                pagination={{ pageSize: 5 }}
                scroll={{ x: 'max-content' }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title="Add Task"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTask}>
          <Form.Item name="taskName" label="Task Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="taskDescription" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="taskType" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Select type">
              <Option value={1}>Uu Tien</Option>
              <Option value={0}>Khong Uu Tien</Option>
            </Select>
          </Form.Item>
          <Form.Item name="taskDeadline" label="Deadline" rules={[{ required: true }]}>
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
      title="Edit Task"
      open={isEditModalVisible}
      onCancel={handleEditModalClose}
      footer={null}
    >
      {selectedTask && (
        <Form
        form={form}  // Make sure you're passing the form instance
        onFinish={handleUpdateTask}  // Use onFinish instead of onSubmit for Ant Design
      >
        <Form.Item name="taskName" label="Task Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="taskType" label="Type" rules={[{ required: true }]}>
          <Select placeholder="Select type">
            <Select.Option value={1}>Uu Tien</Select.Option>
            <Select.Option value={0}>Khong Uu Tien</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Update Task
          </Button>
        </Form.Item>
      </Form>      
      )}
    </Modal>
      <Modal
        title="Task Details"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="close" onClick={handleDetailModalClose}>
            Close
          </Button>
        ]}
      >
        {selectedTask && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Task Name">{selectedTask.taskName}</Descriptions.Item>
            <Descriptions.Item label="Description">{selectedTask.description}</Descriptions.Item>
            <Descriptions.Item label="Type">
              {selectedTask.taskType === 1 ? 'Uu Tien' : 'Khong Uu Tien'}
            </Descriptions.Item>
            <Descriptions.Item label="Deadline">
              {moment(selectedTask.deadline).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedTask.status === 1 ? 'Active' : 'Completed'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default Main;
