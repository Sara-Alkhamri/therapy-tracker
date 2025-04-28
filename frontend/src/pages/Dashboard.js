import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend /* eslint-disable-line no-unused-vars */, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell } from 'recharts';
import fetchSessions from '../api/fetchSessions';
import fetchGoals from '../api/fetchGoals';
import '../scss/pages/_dashboard.scss';

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getSessions = async () => {
        try {
            const data = await fetchSessions();
            return data || [];
        } catch (error) {
            console.error('Error fetching sessions:', error);
            return [];
        }
    };

    const getGoals = async () => {
        try {
            const data = await fetchGoals();
            return data || [];
        } catch (error) {
            console.error('Error fetching goals:', error);
            return [];
        }
    };

    const calculateStreak = (sessionsData = []) => {
        if (!sessionsData?.length) return 0;

        const sortedSessions = [...sessionsData]
            .filter(s => s?.date)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (!sortedSessions.length) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedSessions.length; i++) {
            const sessionDate = new Date(sortedSessions[i].date);
            sessionDate.setHours(0, 0, 0, 0);

            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - i);

            if (sessionDate.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    };

    const generateHeatmapData = (sessionsData = []) => {
        const daysInWeek = 7;
        const weeksToShow = 6;
        const heatmapData = Array(weeksToShow).fill().map(() =>
            Array(daysInWeek).fill().map(() => ({ value: null }))
        );

        sessionsData.forEach(session => {
            if (!session?.date) return;

            const date = new Date(session.date);
            const dayOfWeek = date.getDay();
            const weekDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24 * 7));

            if (weekDiff < weeksToShow) {
                const weekIndex = weeksToShow - 1 - weekDiff;
                heatmapData[weekIndex][dayOfWeek] = {
                    value: session.mood,
                    date: date.toLocaleDateString()
                };
            }
        });

        return heatmapData;
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [sessionsData, goalsData] = await Promise.all([
                    getSessions(),
                    getGoals()
                ]);

                setSessions(sessionsData);
                setGoals(goalsData);
                setCurrentStreak(calculateStreak(sessionsData));
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const processSessionData = () => {
        return sessions
            .filter(s => s?.date && typeof s.mood === 'number')
            .map(session => ({
                date: new Date(session.date).toLocaleDateString(),
                mood: session.mood
            }));
    };

    const processGoalData = () => {
        return goals
            .filter(g => g?.description)
            .map(goal => ({
                name: goal.description.substring(0, 15) + (goal.description.length > 15 ? '...' : ''),
                progress: goal.progress || 0
            }));
    };

    if (isLoading) {
        return (
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    const heatmapData = generateHeatmapData(sessions);
    const sessionData = processSessionData();
    const goalData = processGoalData();

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <header className="dashboard__header">
                    <h1>Your Mental Wellness Dashboard</h1>
                    <p>Track your progress and gain valuable insights into your therapy journey</p>
                </header>

                <div className="dashboard__grid">
                    {/* Mood Heatmap & Streak Card */}
                    <div className="dashboard__card dashboard__heatmap">
                        <h2>Mood & Activity</h2>

                        {sessions.length > 0 ? (
                            <>
                                <div className="heatmap-streak-container">
                                    <div className="streak-display">
                                        <div className="streak-count">{currentStreak}</div>
                                        <div className="streak-label">day streak</div>
                                        {currentStreak > 2 && (
                                            <div className="streak-emoji">🔥</div>
                                        )}
                                    </div>

                                    <div className="heatmap-grid">
                                        {heatmapData.map((week, weekIndex) => (
                                            <div key={`week-${weekIndex}`} className="heatmap-week">
                                                {week.map((day, dayIndex) => (
                                                    <div
                                                        key={`day-${dayIndex}`}
                                                        className={`heatmap-day ${day.value ? `mood-${day.value}` : ''}`}
                                                        title={day.date ? `Mood: ${day.value} (${day.date})` : 'No data'}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/log-session')}
                                    className="btn btn--primary"
                                >
                                    Log Today's Mood
                                </button>
                            </>
                        ) : (
                            <div className="no-data-message">
                                <p>No mood data yet</p>
                                <button
                                    onClick={() => navigate('/log-session')}
                                    className="btn btn--primary"
                                >
                                    Start Tracking
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mood Trends Card */}
                    <div className="dashboard__card">
                        <h2>Mood Trends</h2>
                        {sessionData.length > 0 ? (
                            <>
                                <div className="dashboard__chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={sessionData}
                                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="mood"
                                                strokeWidth={3}
                                                dot={{ r: 4 }}
                                                activeDot={{ r: 6 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <button
                                    onClick={() => navigate('/log-session')}
                                    className="btn btn--secondary"
                                >
                                    + Add Session
                                </button>
                            </>
                        ) : (
                            <div className="no-data-message">
                                <p>No mood trends data yet</p>
                                <button
                                    onClick={() => navigate('/log-session')}
                                    className="btn btn--secondary"
                                >
                                    Start Logging
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Goal Progress Card */}
                    <div className="dashboard__card">
                        <h2>Goal Progress</h2>
                        {goalData.length > 0 ? (
                            <>
                                <div className="dashboard__chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={goalData}
                                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Bar dataKey="progress">
                                                {goalData.map((_, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        className={index % 2 ? 'bar-cell-primary' : 'bar-cell-accent'}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <button
                                    onClick={() => navigate('/set-goal')}
                                    className="btn btn--secondary"
                                >
                                    + New Goal
                                </button>
                            </>
                        ) : (
                            <div className="no-data-message">
                                <p>No goals set yet</p>
                                <button
                                    onClick={() => navigate('/set-goal')}
                                    className="btn btn--secondary"
                                >
                                    Set a Goal
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dashboard__cta">
                    <button
                        onClick={() => navigate('/log-session')}
                        className="btn btn--primary btn--large"
                    >
                        Start New Therapy Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;