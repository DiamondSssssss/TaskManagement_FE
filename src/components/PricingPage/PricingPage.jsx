import React from 'react';
import { Card, Button, Row, Col, Typography, List, Badge } from 'antd';
import { CheckCircleOutlined, CrownOutlined } from '@ant-design/icons';
import './PricingPage.css';

const { Title, Text } = Typography;

const PricingPage = () => {
  const pricingData = [
    {
      title: 'Basic',
      price: '$9.99',
      period: '/month',
      features: [
        'Up to 10 projects',
        '1GB storage',
        'Basic priority support',
        'Access to core features',
      ],
    },
    {
      title: 'Pro',
      price: '$19.99',
      period: '/month',
      features: [
        'Unlimited projects',
        '10GB storage',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
      ],
      popular: true,
    },
    {
      title: 'Enterprise',
      price: '$49.99',
      period: '/month',
      features: [
        'Unlimited everything',
        '100GB storage',
        '24/7 premium support',
        'Custom integrations',
        'Dedicated account manager',
        'On-premise deployment option',
      ],
    },
  ];

  return (
    <div className="pricing-page">
      <Title level={1} className="pricing-title">Choose Your Plan</Title>
      <Text className="pricing-subtitle">Unlock premium features and boost your productivity</Text>
      <Row gutter={[32, 32]} justify="center" className="pricing-row">
        {pricingData.map((plan, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Badge.Ribbon text="POPULAR" color="#f50" style={{ display: plan.popular ? 'block' : 'none' }}>
              <Card
                hoverable
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                cover={
                  <div className="card-header">
                    <Title level={2}>{plan.title}</Title>
                    <div className="price">
                      <Text className="amount">{plan.price}</Text>
                      <Text className="period">{plan.period}</Text>
                    </div>
                  </div>
                }
                actions={[
                  <Button type="primary" size="large" className="subscribe-btn">
                    Subscribe Now
                  </Button>
                ]}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={plan.features}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                        title={item}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PricingPage;
