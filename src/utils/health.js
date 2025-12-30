// Health check utility functions
export const getHealthStatus = () => {
    const startTime = Date.now();

    return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        application: 'InkSoul Frontend',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: Math.floor((Date.now() - startTime) / 1000),
        services: {
            frontend: {
                status: 'healthy',
                responseTime: Math.random() * 100 + 50, // Simulated response time
            },
            api: {
                status: 'healthy',
                responseTime: Math.random() * 200 + 100,
            },
            database: {
                status: 'healthy',
                responseTime: Math.random() * 150 + 80,
            }
        },
        checks: {
            memory: {
                status: 'healthy',
                used: '45%',
                available: '55%'
            },
            disk: {
                status: 'healthy',
                used: '62%',
                available: '38%'
            },
            network: {
                status: 'healthy',
                latency: Math.floor(Math.random() * 50) + 10 + 'ms'
            }
        }
    };
};

export const checkApiHealth = async () => {
    try {
        // In a real application, this would make actual API calls
        // For now, we'll simulate the health check
        await new Promise(resolve => setTimeout(resolve, 100));

        return {
            status: 'healthy',
            message: 'All services are operational',
            data: getHealthStatus()
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            message: 'Some services are experiencing issues',
            error: error.message,
            data: {
                ...getHealthStatus(),
                status: 'degraded'
            }
        };
    }
};

// Simulate an API endpoint response
export const healthApiResponse = () => {
    const healthData = getHealthStatus();

    // Return response in API format
    return new Response(JSON.stringify(healthData, null, 2), {
        status: healthData.status === 'healthy' ? 200 : 503,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache'
        }
    });
};