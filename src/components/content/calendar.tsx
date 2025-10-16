'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock events data
  const events = [
    { date: new Date(new Date().setDate(new Date().getDate() + 1)), title: 'Project Deadline', type: 'work' },
    { date: new Date(new Date().setDate(new Date().getDate() + 3)), title: 'Team Meeting', type: 'meeting' },
    { date: new Date(new Date().setDate(new Date().getDate() - 2)), title: 'Code Review', type: 'work' },
    { date: new Date(new Date().setDate(new Date().getDate() + 5)), title: 'Portfolio Update', type: 'personal' },
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const hasEvent = (date: Date) => {
    return events.some(event => isSameDay(event.date, date));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      const date = new Date(year, month - 1, i);
      days.push(
        <div 
          key={`prev-${i}`} 
          className="p-2 text-center text-muted-foreground/50 cursor-pointer hover:bg-muted rounded-lg"
          onClick={() => {
            setSelectedDate(date);
          }}
        >
          {i}
        </div>
      );
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = isSameDay(date, new Date());
      const isSelected = isSameDay(date, selectedDate);
      const hasEvents = hasEvent(date);
      
      days.push(
        <div 
          key={`current-${i}`} 
          className={`p-2 text-center cursor-pointer rounded-lg relative
            ${isToday ? 'bg-primary/20 border border-primary' : ''}
            ${isSelected ? 'bg-primary text-primary-foreground' : ''}
            ${!isToday && !isSelected ? 'hover:bg-muted' : ''}
          `}
          onClick={() => {
            setSelectedDate(date);
          }}
        >
          {i}
          {hasEvents && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <Circle className="h-1.5 w-1.5 fill-current" />
            </div>
          )}
        </div>
      );
    }
    
    // Next month days
    const totalCells = 42; // 6 rows x 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push(
        <div 
          key={`next-${i}`} 
          className="p-2 text-center text-muted-foreground/50 cursor-pointer hover:bg-muted rounded-lg"
          onClick={() => {
            setSelectedDate(date);
          }}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="h-full flex flex-col">
      {/* Calendar Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg hover:bg-muted"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => {
                setCurrentDate(new Date());
                setSelectedDate(new Date());
              }}
              className="px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Today
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg hover:bg-muted"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 gap-1 p-4 overflow-auto">
        {renderCalendar()}
      </div>
      
      {/* Selected Date Events */}
      <div className="border-t p-4">
        <h3 className="font-medium mb-2">
          {formatDate(selectedDate)}
        </h3>
        
        {selectedDateEvents.length > 0 ? (
          <div className="space-y-2">
            {selectedDateEvents.map((event, index) => (
              <div 
                key={index} 
                className="p-2 rounded-lg bg-muted flex items-center"
              >
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  event.type === 'work' ? 'bg-blue-500' : 
                  event.type === 'meeting' ? 'bg-green-500' : 'bg-purple-500'
                }`} />
                <span className="text-sm">{event.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No events scheduled</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;