import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as testService from '../../services/testService';
import styles from '../Dashboard/DashboardStyle.module.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalServices: 0,
    totalBookings: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch test message
        const testData = await testService.test();
        setMessage(testData.message);

        // In a real app, you would fetch stats from your API
        // For now, we'll simulate some data
        setTimeout(() => {
          setStats({
            totalUsers: 156,
            totalProducts: 42,
            totalServices: 28,
            totalBookings: 189,
            pendingBookings: 12
          });
          setLoading(false);
        }, 500);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    if (user) fetchDashboardData();

  }, [user]);

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* Welcome Header */}
        <div className={styles.welcomeHeader}>
          <h1>Welcome back, {user.username}! 👋</h1>
          <p className={styles.welcomeText}>
            Here's what's happening with your business today. Manage products, services, and bookings from one dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <div className={styles.statCardTitle}>Total Users</div>
              <div className={`${styles.statCardIcon} ${styles.iconUsers}`}>
                👥
              </div>
            </div>
            <h3 className={styles.statCardValue}>{stats.totalUsers}</h3>
            <div className={`${styles.statCardChange} ${styles.changePositive}`}>
              <span>↑ 12%</span>
              <span>from last month</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <div className={styles.statCardTitle}>Total Products</div>
              <div className={`${styles.statCardIcon} ${styles.iconProducts}`}>
                🛒
              </div>
            </div>
            <h3 className={styles.statCardValue}>{stats.totalProducts}</h3>
            <div className={`${styles.statCardChange} ${styles.changePositive}`}>
              <span>↑ 8%</span>
              <span>from last month</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <div className={styles.statCardTitle}>Total Services</div>
              <div className={`${styles.statCardIcon} ${styles.iconServices}`}>
                🛠️
              </div>
            </div>
            <h3 className={styles.statCardValue}>{stats.totalServices}</h3>
            <div className={`${styles.statCardChange} ${styles.changePositive}`}>
              <span>↑ 15%</span>
              <span>from last month</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <div className={styles.statCardTitle}>Pending Bookings</div>
              <div className={`${styles.statCardIcon} ${styles.iconBookings}`}>
                📅
              </div>
            </div>
            <h3 className={styles.statCardValue}>{stats.pendingBookings}</h3>
            <Link to="/bookings" className={styles.viewAll}>
              Review now →
            </Link>
          </div>
        </div>

        {/* Auth Message Card */}
        <div className={styles.authMessage}>
          <div className={styles.messageCard}>
            <div className={styles.messageIcon}>
              🔐
            </div>
            <div className={styles.messageContent}>
              <p><strong>Authentication Test:</strong> {message}</p>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                Your JWT token is working correctly! You're authenticated as <strong>{user.email}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Recent Activity */}
          <div className={styles.recentActivity}>
            <div className={styles.sectionHeader}>
              <h2>Recent Activity</h2>
              <Link to="/activity" className={styles.viewAll}>
                View all
              </Link>
            </div>
            
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  🛒
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>New product added</p>
                  <p className={styles.activityTime}>2 hours ago</p>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  🛠️
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>Service booking confirmed</p>
                  <p className={styles.activityTime}>5 hours ago</p>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  👤
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>New user registered</p>
                  <p className={styles.activityTime}>Yesterday</p>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  📊
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>Monthly report generated</p>
                  <p className={styles.activityTime}>2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <div className={styles.sectionHeader}>
              <h2>Quick Actions</h2>
            </div>
            
            <div className={styles.actionsGrid}>
              <Link to="/products/new" className={styles.actionButton}>
                <div className={styles.actionIcon}>➕</div>
                <div className={styles.actionLabel}>Add Product</div>
              </Link>

              <Link to="/services/new" className={styles.actionButton}>
                <div className={styles.actionIcon}>🛠️</div>
                <div className={styles.actionLabel}>Add Service</div>
              </Link>

              <Link to="/bookings" className={styles.actionButton}>
                <div className={styles.actionIcon}>📅</div>
                <div className={styles.actionLabel}>View Bookings</div>
              </Link>

              <Link to="/users" className={styles.actionButton}>
                <div className={styles.actionIcon}>👥</div>
                <div className={styles.actionLabel}>Manage Users</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;