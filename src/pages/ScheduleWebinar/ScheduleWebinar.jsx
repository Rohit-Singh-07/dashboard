import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, message } from 'antd';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import moment from 'moment';
import { FlagOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = TimePicker;

const ScheduleWebinar = () => {
  const [form] = Form.useForm();
  const [webinars, setWebinars] = useState([]);

  // Custom date format function
  const customDateFormat = (value) => {
    const day = value.date();
    const month = value.format('MMM');
    const suffix = ['th', 'st', 'nd', 'rd'][((day % 100) - 20) % 10] || 'th';
    return `${day}${suffix} ${month}`;
  };

  const fetchWebinars = async () => {
    const querySnapshot = await getDocs(collection(db, 'webinars'));
    const webinarsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWebinars(webinarsData);
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const onFinish = async (values) => {
    try {
      const { title, meetLink, date, timeRange, description } = values;

      // Combine date and time range
      const [startTime, endTime] = timeRange;
      const startDateTime = new Date(
        date.format('YYYY-MM-DD') + ' ' + startTime.format('HH:mm'),
      );
      const endDateTime = new Date(
        date.format('YYYY-MM-DD') + ' ' + endTime.format('HH:mm'),
      );

      // Save to Firebase
      await addDoc(collection(db, 'webinars'), {
        title,
        meetLink,
        startTime: startDateTime,
        endTime: endDateTime,
        description,
      });

      message.success('Webinar scheduled successfully!');
      form.resetFields();
      fetchWebinars(); // Refresh the webinar list
    } catch (error) {
      console.error('Error adding document:', error);
      message.error('Failed to schedule webinar. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold w-full text-center text-[#000000E0] mb-4">
        Schedule Webinar
      </h2>
      <div className="w-full flex justify-center mb-24">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="bg-white p-6 rounded-lg shadow-md w-[50%]"
        >
          <FlagOutlined className="p-[12px] text-[24px] border border-[#E4E7EC] rounded-lg mb-4" />
          <div className="flex flex-col mb-4">
            <h1 className="text-[18px]">Add Details</h1>
            <p className="text-[#475467]">
              Share where you’ve worked on your profile.
            </p>
          </div>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'What is your title?' }]}
          >
            <Input placeholder="Enter webinar title" />
          </Form.Item>

          <Form.Item
            label="Meet Link"
            name="meetLink"
            rules={[{ required: true, message: 'Please enter the meet link' }]}
          >
            <Input placeholder="www.example.com" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              label="Time"
              name="timeRange"
              rules={[
                { required: true, message: 'Please select the time range' },
              ]}
            >
              <RangePicker className="w-full" format="h:mm A" use12Hours />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: 'Please select the date' }]}
            >
              <DatePicker className="w-full" format={customDateFormat} />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea
              rows={4}
              placeholder="e.g. I joined Stripe’s Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="w-full">
              Schedule Webinar
            </Button>
          </Form.Item>
        </Form>
      </div>

      <h2 className="text-2xl font-bold my-4 text-black">Scheduled</h2>
      <div className='text-black'>
        {webinars.length === 0 ? (
          <p>No webinars scheduled yet.</p>
        ) : (
          <table className="min-w-full">
            <thead className="bg-[#F3F5FF]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time & Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 hover:bg-[#F0F0F0]">
              {webinars.map((webinar) => {
                const startTime = webinar.startTime
                  ? moment(webinar.startTime.toDate())
                  : null;
                const endTime = webinar.endTime
                  ? moment(webinar.endTime.toDate())
                  : null;

                return (
                  <tr key={webinar.id} onClick={() => window.open(webinar.meetLink, '_blank')}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {webinar.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {startTime && endTime
                        ? `${startTime.format('h:mm A')} - ${endTime.format(
                            'h:mm A',
                          )} | ${startTime.format('Do MMM')}`
                        : 'Not available'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {webinar.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                      <a
                        href={webinar.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {webinar.meetLink}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ScheduleWebinar;
