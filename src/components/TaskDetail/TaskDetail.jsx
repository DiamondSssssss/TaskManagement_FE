
import React from 'react';
import { Typography, Descriptions } from 'antd';
import moment from 'moment';

const { Title } = Typography;

function TaskDetail({ task }) {
  return (
    <div>
      <Title level={3}>{task.taskName}</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Description">{task.description}</Descriptions.Item>
        <Descriptions.Item label="Type">
          {task.taskType === '1' ? 'Uu Tien' : 'Khong Uu Tien'}
        </Descriptions.Item>
        <Descriptions.Item label="Deadline">
          {moment(task.deadline).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {task.status === 1 ? 'Active' : 'Completed'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default TaskDetail;