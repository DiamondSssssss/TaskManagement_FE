import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import {
  CheckCircleOutlined,
  TeamOutlined,
  BarChartOutlined,
  BellOutlined,
  CloudSyncOutlined,
  LockOutlined,
} from '@ant-design/icons';
import './FeaturesPage.css';

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <CheckCircleOutlined />,
    title: 'Task Management',
    description: 'Create, organize, and track your tasks with ease.',
  },
  {
    icon: <TeamOutlined />,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with shared projects and tasks.',
  },
  {
    icon: <BarChartOutlined />,
    title: 'Progress Tracking',
    description: 'Visualize your productivity with intuitive charts and reports.',
  },
  {
    icon: <BellOutlined />,
    title: 'Smart Reminders',
    description: 'Never miss a deadline with customizable notifications.',
  },
  {
    icon: <CloudSyncOutlined />,
    title: 'Cloud Sync',
    description: 'Access your tasks from anywhere, on any device.',
  },
  {
    icon: <LockOutlined />,
    title: 'Data Security',
    description: 'Your data is encrypted and securely stored.',
  },
];

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <Title level={1}>TaskMaster Features</Title>
      <Paragraph>
        Discover the powerful features that make TaskMaster the ultimate productivity tool.
      </Paragraph>
      
      <Row gutter={[16, 16]} className="features-row">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <Title level={3}>{feature.title}</Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturesPage;
